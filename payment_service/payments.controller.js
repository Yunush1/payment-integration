const { createRazorpayInstace } = require("../config/payment.config");
const dotenv = require('dotenv');
const crypto = require('crypto');
const razorpayInstance = createRazorpayInstace();
dotenv.config();
exports.createOrder = async (req, res)=>{
    const {course_id, amount} = req.body;
    // checks

    if(!course_id || !amount){
        return res.status(400).json({
            success:false,
            message:"course id and amount is required"
        })
    }

    const options = {
        amount: amount*100,
        currency : "INR",
        receipt : `receipt_order_1`,
    }


    try{
        razorpayInstance.orders.create(options, (err, order)=>{
            if(err){
                return res.status(500).json({
                    success : false,
                    message: "Somthing went worng"+err.message,
                });
            }
            return res.status(200).json(order);
        });

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Somthing went worng "+err,
        });
    }
}

exports.verifyPayment = async (req, res)=>{
    const {order_id, payment_id, signature} = req.body;

    const secret = process.env.RAZORPAY_SECRET_ID;

    const hmac = crypto.createHmac("sha256", secret);

    hmac.update(order_id+"|"+payment_id);

    const generatedSignature = hmac.digest("hex");


    if(generatedSignature == signature){
        return res.status(200).json({
            success:true,
            message:"Payment verified",
        });
    }else{
        return res.status(400).json({
            success:false,
            message:"Payment not verified"
        })
    }

}