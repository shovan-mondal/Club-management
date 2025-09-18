import express from 'express';
import { 
    saveInterest, 
    getUserInterests, 
    getClubInterests, 
    removeInterest 
} from '../controllers/interestedController.js';

const router = express.Router();

// POST /api/interests - Save user interest in a club
router.post('/', saveInterest);

// GET /api/interests/user/:userId - Get all interests for a specific user
router.get('/user/:userId', getUserInterests);

// GET /api/interests/club/:clubName - Get all interests for a specific club
router.get('/club/:clubName', getClubInterests);

// DELETE /api/interests - Remove user interest
router.delete('/', removeInterest);

export default router;