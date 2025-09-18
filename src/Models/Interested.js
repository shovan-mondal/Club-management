import mongoose from 'mongoose';

const interestedSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    clubName: {
        type: String,
        required: true
    },
    clubType: {
        type: String,
        enum: ['Technical', 'Non-Technical'],
        required: true
    },
    interestedAt: {
        type: Date,
        default: Date.now
    }
}, { 
    timestamps: true 
});

// Create compound index to prevent duplicate interests for same user-club combination
interestedSchema.index({ userId: 1, clubName: 1 }, { unique: true });

export default mongoose.model('Interested', interestedSchema);