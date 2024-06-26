require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const NetworkPacket = require('./models/TrafficModel');

const app = express();
app.use(cors({
  origin: ["https://vpnspyglass.vercel.app"],
  methods: ["POST","GET"],
  credentials: true
}));
const dbURI = process.env.DB_URI;

mongoose
  .connect(dbURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.get('/api/network-packets', async (req, res) => {
  try {
    const packets = await NetworkPacket.find();
    res.json(packets);
    // console.log(packets);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.get('/api/network-packets-current-date', async (req, res) => {
  try {
    const currentDate = new Date();
    const startOfDay = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0));
    const endOfDay = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59, 999));
    
    const packets = await NetworkPacket.find({
      timestamp: {
        $gte: startOfDay,
        $lt: endOfDay,
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

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
