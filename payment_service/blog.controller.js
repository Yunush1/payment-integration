const { createClient } = require("../config/redise.config");
const Blog = require("../model/blog");

exports.getBlogs = async(req, res)=>{
    try{
        
        const client= createClient()
        // const bl =await client.get('blog');
        // if(bl){
        //     res.status(200).json(bl);
        // }
        const blog = await Blog.find();
        // client.set('blog',blog)
        // console.log(await client.get('blog'));
       return res.status(200).json(blog);
    }catch(err){
       return res.status(400).json({
            success :false,
            message:"Blog not found"
        })
    }
}