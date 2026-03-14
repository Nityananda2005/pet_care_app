const mongoose = require("mongoose");

const vaccinationSchema = new mongoose.Schema({
    pet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pet",
        required: true,
    },
    vaccineName: {
        type: String,
        required: true
    },

    dateGiven: {
        type: Date,
        required: true
    },

    dueDate: {
        type: Date
    },

    vet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    notes: {
        type: String
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("Vaccination", vaccinationSchema);
