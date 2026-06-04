// models/Logbook.js
import mongoose from 'mongoose';

const logbookSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  firmId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  weekNumber: { type: Number, required: true },
  monday: { type: String, default: '' },
  tuesday: { type: String, default: '' },
  wednesday: { type: String, default: '' },
  thursday: { type: String, default: '' },
  friday: { type: String, default: '' },
  weeklyReflection: { type: String, default: '' },
  firmSignOff: { type: String, required: true, enum: ['Draft Mode', 'Pending Review', 'Approved'], default: 'Draft Mode' },
  facultySignOff: { type: String, required: true, enum: ['Not Started', 'Pending Review', 'Approved'], default: 'Not Started' }
}, { timestamps: true });

// Prevent duplicate entries by ensuring a student can create only one logbook record per week
logbookSchema.index({ studentId: 1, weekNumber: 1 }, { unique: true });

export default mongoose.model('Logbook', logbookSchema);