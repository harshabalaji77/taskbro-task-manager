import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './src/config/db.config.js';
import authRoutes from './src/routes/auth.routes.js';

dotenv.config();
connectDB();

const app = express();

const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
if (process.env.CLIENT_URL) {
  allowedOrigins.push(process.env.CLIENT_URL);
}

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'TaskBro Auth API is running...' });
});

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`TaskBro secure authentication server running on port ${PORT}`);
});