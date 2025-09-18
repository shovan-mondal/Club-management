import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import apiRoutes from './routes/index.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// More permissive CORS for development
app.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Database connection
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
    .then(() => console.log('✓ MongoDB connected successfully'))
    .catch(err => console.error('✗ MongoDB connection error:', err));

// API Routes
app.use('/api', apiRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'CMRIT Clubs Backend API',
        version: '1.0.0',
        endpoints: {
            health: '/api/health',
            auth: '/api/auth/google',
            userProfile: '/api/auth/user/:userId',
            interests: '/api/interests',
            userInterests: '/api/interests/user/:userId',
            clubInterests: '/api/interests/club/:clubName'
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
        path: req.originalUrl
    });
});

// Server startup
const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, '127.0.0.1', () => {
    console.log(`✓ Server running on http://localhost:${PORT}`);
    console.log(`✓ Server accessible at http://127.0.0.1:${PORT}`);
    console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
});

server.on('error', (err) => {
    console.error('Server error:', err);
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Trying port ${PORT + 1}...`);
        server.close();
        app.listen(PORT + 1, '0.0.0.0', () => {
            console.log(`✓ Server running on http://localhost:${PORT + 1}`);
        });
    }
});