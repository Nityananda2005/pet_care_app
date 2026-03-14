const mongoose = require('mongoose');

const rescueSchema = new mongoose.Schema({
    reporter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false // allow anonymous reporting if not logged in
    },
    location: {
        type: String,
        required: [true, 'Location is required']
    },
    condition: {
        type: String,
        required: [true, 'Animal condition is required']
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    status: {
        type: String,
        enum: ['Pending', 'Responding', 'Resolved'],
        default: 'Pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Rescue', rescueSchema);
