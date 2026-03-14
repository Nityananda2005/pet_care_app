const mongoose  = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    pet:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Pet",
        required:true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    vet:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    reason:{
        type:String,
        required: true
    },
    status:{
        type:String,
        enum:["pending","approved","rejected"],
        default:"pending"
    }
},{
    timestamps:true
});

module.exports = mongoose.model("Appointment",appointmentSchema);