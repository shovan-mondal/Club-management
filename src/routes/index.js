import express from 'express';
import authRoutes from './authRoutes.js';
import healthRoutes from './healthRoutes.js';

const router = express.Router();

// Mount route modules
router.use('/auth', authRoutes);
router.use('/', healthRoutes);

export default router;