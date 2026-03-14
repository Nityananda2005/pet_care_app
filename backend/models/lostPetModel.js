const mongoose = require("mongoose");

const lostPetSchema = new mongoose.Schema(
  {
    petName: {
      type: String,
      required: true
    },

    species: {
      type: String,
      required: true,
      enum: ["Dog", "Cat", "Bird", "Other"],
      default: "Dog"
    },

    gender: {
      type: String,
    },

    breed: {
      type: String
    },

    location: {
      type: String,
      required: true
    },

    description: {
      type: String
    },

    image: {
      type: String,
      required: true
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    status: {
      type: String,
      enum: ["lost", "found"],
      default: "lost"
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("LostPet", lostPetSchema);