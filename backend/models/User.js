const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["pet_owner", "vet", "shelter", "seller", "admin"],
        default: "pet_owner"
    },
    phone: {
        type: String,
        trim: true,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            default: [0, 0]
        }
    },
    status: {
        type: String,
        enum: ["active", "pending"],
        default: "active"
    }
}, {
    timestamps: true,
});

userSchema.index({ location: "2dsphere" });

module.exports = mongoose.model('User', userSchema);
