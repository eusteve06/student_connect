// models/Placement.js
import mongoose from 'mongoose';

const placementSchema = new mongoose.Schema({
  firmId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  companyName: { type: String, required: true },
  role: { type: String, required: true },
  location: { type: String, required: true },
  duration: { type: String, required: true },
  slots: { type: Number, required: true, default: 1 },
  description: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Placement', placementSchema);