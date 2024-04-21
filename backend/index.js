require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const WebSocket = require('ws');

const NetworkPacket = require('./models/TrafficModel');

const app = express();
app.use(cors({
  origin: ["https://vpnspyglass.vercel.app"],
  methods: ["POST","GET"],
  credentials: true
}));

const dbURI = process.env.DB_URI;

mongoose.connect(dbURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// WebSocket server setup
const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${server.address().port}`);
});

const wss = new WebSocket.Server({ server });

// WebSocket connection handling
wss.on('connection', ws => {
  console.log('Client connected');

  // Send initial data when client connects
  sendInitialData(ws);

  // Listen for new database entries
  const changeStream = NetworkPacket.watch();
  changeStream.on('change', () => {
    sendInitialData(ws); // Send updated data when a change occurs
  });

  // Close WebSocket connection
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

async function sendInitialData(ws) {
  try {
    const packets = await NetworkPacket.find();
    ws.send(JSON.stringify(packets)); // Send data to connected clients
  } catch (err) {
    console.error('Error fetching data:', err);
  }
}

// Routes
app.get('/api/network-packets', async (req, res) => {
  try {
    const packets = await NetworkPacket.find();
    res.json(packets);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.get('/api/network-packets-current-date', async (req, res) => {
  try {
    const currentDate = new Date().toISOString().split('T')[0];
    const packets = await NetworkPacket.find({
      timestamp: {
        $gte: new Date(currentDate),
        $lt: new Date(currentDate + 'T23:59:59.999Z'),
      },
    });

    res.json(packets);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.post('/api/network-packets', async (req, res) => {
  try {
    const newPacketData = req.body;
    const createdPacket = await NetworkPacket.create(newPacketData);
    res.status(201).json(createdPacket);
  } catch (err) {
    console.error('Error creating new packet:', err);
    res.status(500).json({ error: 'Error creating new packet' });
  }
});
