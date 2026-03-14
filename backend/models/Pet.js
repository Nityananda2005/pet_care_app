const mongoose  = require("mongoose");

const petSchema = new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    name:{
        type:String,
        required:true,
        trim:true,
    },
      species: {
    type: String,
    required: true
  },
    age:{
        type:Number,
        required:true,
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"],
    },
    breed:{
        type:String,
        required:true,
    },
    weight:{
        type:Number,
        required:true,
    },
    mood:{
        type:String,
        required:true,
        enum:["happy","sad","angry","energetic","calm"],
    },
    image:{
        type:String,
        required:true,
    },
    bloodGroup: String,

  identificationNumber: String, // microchip ID

  allergies: [String]
    
})

module.exports = mongoose.model("Pet",petSchema);
