import express from 'express';
import dotenv from 'dotenv';
import authRoutes from "./routes/authRoutes.js";
import connectDB from './config/db.js';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Auth API is running 🚀');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
