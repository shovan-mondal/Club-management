import Interested from '../Models/Interested.js';
import User from '../Models/User.js';

// Save user interest in a club
export const saveInterest = async (req, res) => {
    try {
        const { userId, clubName, clubType } = req.body;

        // Debug logging
        console.log('Received interest request:', req.body);

        // Validate required fields
        if (!userId || !clubName || !clubType) {
            console.log('Missing fields - userId:', !!userId, 'clubName:', !!clubName, 'clubType:', !!clubType);
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: userId, clubName, and clubType are required',
                received: { userId: !!userId, clubName: !!clubName, clubType: !!clubType }
            });
        }

        // Verify user exists - try different ways to find the user
        let user;
        
        // Try finding by MongoDB ObjectId first
        if (userId.match(/^[0-9a-fA-F]{24}$/)) {
            user = await User.findById(userId);
        }
        
        // If not found, try finding by googleId
        if (!user) {
            user = await User.findOne({ googleId: userId });
        }
        
        // If still not found, try finding by email (if userId is an email)
        if (!user && userId.includes('@')) {
            user = await User.findOne({ email: userId });
        }

        if (!user) {
            console.log('User not found with ID:', userId);
            return res.status(404).json({
                success: false,
                message: 'User not found. Please try logging in again.',
                userId: userId
            });
        }

        console.log('Found user:', user.name, user.email);

        // Check if user already showed interest in this club
        const existingInterest = await Interested.findOne({ userId: user._id, clubName });
        if (existingInterest) {
            return res.status(409).json({
                success: false,
                message: `You have already shown interest in ${clubName}`,
                interest: existingInterest
            });
        }

        // Create new interest record
        const newInterest = new Interested({
            userId: user._id,
            userEmail: user.email,
            userName: user.name,
            clubName,
            clubType
        });

        await newInterest.save();

        console.log(`New interest saved: ${user.name} interested in ${clubName} (${clubType})`);

        res.status(201).json({
            success: true,
            message: `Interest in ${clubName} saved successfully!`,
            interest: newInterest
        });

    } catch (error) {
        console.error('Error saving interest:', error);
        
        // Handle duplicate key error (if compound index fails)
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: 'You have already shown interest in this club'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Failed to save interest',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get all interests for a specific user
export const getUserInterests = async (req, res) => {
    try {
        const { userId } = req.params;

        const interests = await Interested.find({ userId })
            .sort({ interestedAt: -1 })
            .populate('userId', 'name email');

        res.status(200).json({
            success: true,
            count: interests.length,
            interests: interests
        });

    } catch (error) {
        console.error('Error fetching user interests:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch user interests',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get all interests for a specific club
export const getClubInterests = async (req, res) => {
    try {
        const { clubName } = req.params;

        const interests = await Interested.find({ clubName })
            .sort({ interestedAt: -1 })
            .populate('userId', 'name email imageUrl');

        res.status(200).json({
            success: true,
            clubName: clubName,
            count: interests.length,
            interests: interests
        });

    } catch (error) {
        console.error('Error fetching club interests:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch club interests',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Remove user interest (if user wants to withdraw interest)
export const removeInterest = async (req, res) => {
    try {
        const { userId, clubName } = req.body;

        const deletedInterest = await Interested.findOneAndDelete({ userId, clubName });

        if (!deletedInterest) {
            return res.status(404).json({
                success: false,
                message: 'Interest not found'
            });
        }

        res.status(200).json({
            success: true,
            message: `Interest in ${clubName} removed successfully`,
            removedInterest: deletedInterest
        });

    } catch (error) {
        console.error('Error removing interest:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to remove interest',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};