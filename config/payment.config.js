const razorpay = require('razorpay');
const dotenv = require('dotenv');

dotenv.config();

exports.createRazorpayInstace = ()=>{
    return new razorpay({
        key_id:process.env.RAZORPAY_ID,
        key_secret:process.env.RAZORPAY_SECRET_ID,
    });
};

