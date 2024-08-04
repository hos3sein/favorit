const mongoose = require("mongoose");


const FavoriteOrder = new mongoose.Schema(
  {
    user: {
      _id: { type: mongoose.Schema.ObjectId },
      username: { type: String },
      pictureProfile: { type: String },
      phone: { type: String },   
       
    },
   
    orderId:{
      type: mongoose.Schema.ObjectId ,
      require:true
    },

    type:{
     type:String,
    },

    isActive:{
      type:Boolean,
      default:true
    }
  
  },
  { timestamps: true }
);


module.exports = mongoose.model("FavoriteOrdr", FavoriteOrder);
// xxxxxxxxxxxxxxxxxxxxxxxx
