import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Route Controller Engine Imports
import { registerUser, loginUser } from './controllers/authController.js';

dotenv.config();
connectDB();

const app = express();

// Enable Global Multi-Origin Cross-Resource CORS policies safely
app.use(cors());
app.use(express.json());

// Base Checkpoint Verification Route
app.get('/', (req, res) => res.send('Industrial Attachment API Engine Operational.'));

// Explicit Production API Pipeline Mappings
app.post('/api/v1/auth/register', registerUser);
app.post('/api/v1/auth/login', loginUser);

// Fallback Route Handler
app.use((req, res) => res.status(404).json({ message: 'Target API route resource context not found' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Production Backend Engine running in ${process.env.NODE_ENV} mode on port ${PORT}`));