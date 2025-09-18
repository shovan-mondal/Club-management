import express from 'express';
import { googleAuth, getCurrentUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/google', googleAuth);

router.get('/user/:userId', getCurrentUser);

export default router;