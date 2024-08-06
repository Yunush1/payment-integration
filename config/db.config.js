const mongoose = require('mongoose');
const { fillDummyData } = require('../data/filldata');
require('dotenv').config();
exports.dbConnect = async ()=>{
    try {
        await mongoose.connect(
            uri= process.env.MONGOOSE_URI
        )
        // await fillDummyData()
        console.log('Mongoose connetion successfully');
    } catch (error) {
        console.log('Connection failed ',error);
    }
}