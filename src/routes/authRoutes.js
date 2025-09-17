import express from 'express';
import { googleAuth, getCurrentUser } from '../controllers/authController.js';

const router = express.Router();

// POST /api/auth/google - Google OAuth login/signup
router.post('/google', googleAuth);

// GET /api/auth/user/:userId - Get user profile by ID
router.get('/user/:userId', getCurrentUser);

export default router;