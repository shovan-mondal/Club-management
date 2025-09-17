import { OAuth2Client } from 'google-auth-library';
import User from '../Models/User.js';

const client = new OAuth2Client(process.env.VITE_GOOGLE_CLIENT_ID);

// Google OAuth login/signup controller
export const googleAuth = async (req, res) => {
    const { token } = req.body;
    
    try {
        // Verify the Google token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.VITE_GOOGLE_CLIENT_ID,
        });
        
        const { sub: googleId, email, name, picture: imageUrl } = ticket.getPayload();

        // Check if user already exists
        let user = await User.findOne({ googleId });
        
        if (!user) {
            // Create new user if doesn't exist
            user = new User({ 
                googleId, 
                email, 
                name, 
                imageUrl 
            });
            await user.save();
            console.log('New user created:', user);
        } else {
            console.log('User already exists:', user);
        }
        
        // Return user data
        res.status(200).json({
            success: true,
            message: user ? 'User logged in successfully' : 'New user created successfully',
            user: user
        });
        
    } catch (error) {
        console.error("Error verifying Google token:", error);
        res.status(400).json({ 
            success: false,
            error: 'Invalid Google token',
            message: 'Authentication failed'
        });
    }
};

// Health check controller
export const healthCheck = (req, res) => {
    res.status(200).json({ 
        status: 'Server is running', 
        timestamp: new Date().toISOString(),
        service: 'CMRIT-Clubs Backend API'
    });
};

// Get current user profile (if needed for future)
export const getCurrentUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        res.status(200).json({
            success: true,
            user: user
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching user'
        });
    }
};