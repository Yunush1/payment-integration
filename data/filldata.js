const axios = require("axios");
const Blog = require("../model/blog");
exports.fillDummyData = async () =>{
    await axios.get("https://jsonplaceholder.typicode.com/posts").then((res)=>{
        res.data.map(async (blog)=>{
            await Blog.create({
                title:blog.title,
                body:blog.body
            })
        });
    })
}