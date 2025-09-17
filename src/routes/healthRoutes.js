import express from 'express';
import { healthCheck } from '../controllers/authController.js';

const router = express.Router();

// GET /api/health - Health check endpoint
router.get('/health', healthCheck);

export default router;