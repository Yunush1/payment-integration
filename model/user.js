const {mongoose} = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        required:true,
    },
    createdAt: {
        type:Date,
        required:true
    },
    gender:{
        type: String,
        required: true
    }
},{collection:"User"});

exports.User = mongoose.model("User", userSchema);

