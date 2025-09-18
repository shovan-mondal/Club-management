import express from 'express';
import authRoutes from './authRoutes.js';
import healthRoutes from './healthRoutes.js';
import interestedRoutes from './interestedRoutes.js';

const router = express.Router();

// Debug logging
console.log('Loading routes...');
console.log('Auth routes loaded');
console.log('Health routes loaded');
console.log('Interested routes loaded');

// Mount route modules
router.use('/auth', authRoutes);
router.use('/interests', interestedRoutes);
router.use('/', healthRoutes);

console.log('All routes mounted successfully');

export default router;