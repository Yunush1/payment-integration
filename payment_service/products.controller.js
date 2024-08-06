const { Product } = require("../model/products");



exports.createProducts = async (req, res)=>{
    try {
        const product = req.body;
        const isCreateProduct = await Product.create(product)
        
        if(!isCreateProduct){
           return res.status(400).json({
                success : false,
                message : 'Sorry post is not created!'
            });
        }

        return res.status(200).json({
            success : true,
            message:"Product add successfully"
        })
    } catch (error) {
        console.log('Something went wrong ',error);
        return res.status(500).json({
            success : false,
            message:"Product added failed"
        })
    }
}

exports.getProducts = async(req, res)=>{
   
    try{
        const products = await Product.find();
        return res.status(200).json(products);
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Data not found"
        })
    }
}