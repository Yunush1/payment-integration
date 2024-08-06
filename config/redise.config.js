const {createClient} = require('redis');
require('dotenv').config();
exports.createClient = ()=>{
    const client = createClient({
        password: '1gzy2A0d6GTCkqlKgcWiuWPR9uUWYdYR',
        socket: {
            host: 'redis-14655.c283.us-east-1-4.ec2.redns.redis-cloud.com',
            port: 14655
        }
    });
      client.on('connect',()=>console.log('Redis connected successfully'))
      .on('error',(err)=>console.log(err)).connect();
       return client;
}