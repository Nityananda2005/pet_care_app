const mongoose = require("mongoose");

const adoptionSchema = new mongoose.Schema({
    petName: {
        type: String,
        required: true,
    },
    species: {
        type: String,
        required: true,
        enum: ["Dog", "Cat", "Bird", "Other"],
        default: "Dog"
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"],
    },
    breed: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        required: true,
    },
    shelter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: ["available", "adopted"],
        default: "available"
    }
}, { timestamps: true });

module.exports = mongoose.model("Adoption", adoptionSchema);