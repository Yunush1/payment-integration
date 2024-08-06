const { mongoose } = require("mongoose");

const productModel =  new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    // stock:{
    //     type:Number,
    //     required:true,
    // },
    // imageUri:{
    //     type:String,
    //     required:true,
    // },


});

exports.Product =mongoose.model("Produts", productModel);
