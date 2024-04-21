const mongoose = require("mongoose");
const { Schema } = mongoose;

const networkPacketSchema = new Schema({
  timestamp: {
    type: Date,
  },
  source_ip: {
    type: String,
  },
  destination_ip: {
    type: String,
  },
  src_port: {
    type: Number,
  },
  dst_port: {
    type: Number,
  },
  packet_size: {
    type: Number,
  },
  protocol: {
    type: String,
  },
  VPN_Type: {
    type: String,
  },
});

module.exports = mongoose.model("NetworkPacket", networkPacketSchema);
