const mongoose = require("mongoose");

const adoptionRequestSchema = new mongoose.Schema({
    pet:{
        type: mongoose.Schema.Types.ObjectId,
         ref: "Adoption",
    },
    user:{
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
    },
    status:{
        type: String,
        enum:["pending","approved","rejected"],
        default:"pending"
    }
},{timestamps:true});

module.exports = mongoose.model("AdoptionRequest",adoptionRequestSchema);