const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
        title:{
            type:String,
            require:true
        },
        body:{
            type:String,
            required:true,
        }
});

module.exports = mongoose.model("Blogs",blogSchema);