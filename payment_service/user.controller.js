const bcryptjs = require('bcryptjs'); // bcryptjs is a dependencies which is used to create a encrypted password
const {User} = require('../model/user'); 
const user_jwt = require('../middleware/jwttoken'); // user_jwt is a
const jwt = require('jsonwebtoken');
const { token } = require('morgan');
const multer = require('multer');

// exports.createUser=  async (req,res,next) =>{
//     try {
//         const user  = await User.findById(req.user.id).select('-password');
//         res.status(200).json({
//             success : true,
//             user : user
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             success : false,
//             message : 'Server error'
//         })
//         next();
//     }
// }



exports.createUser=  async (req,res,next) =>{
   const {firstname,lastname, email, password,gender} = req.body;

   try {
        let user_exist = await User.findOne({email : email});
        if(user_exist){
            return res.json({
                success : false,
                message : "User already exists"
            });
        }
        let user = new User();
        user.firstname = firstname;
        user.lastname = lastname;
        user.email = email;
        user.gender = gender;
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);
       


        let size = 200;
        user.avatar = "https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109?s="+size+"&d=retro";
        user.createdAt = Date().now;
        await user.save();

        const paylode = {
            user : {
                id : user.id
            }
        }
      
        jwt.sign(paylode, process.env.jwtUserSecret,{
            expiresIn: 360000
        },(err , token)=>{
            if(err) throw err;
            return res.status(200).json({
            success : true,
            token : token
            })
       })

       

   } catch (error) {
        console.log(error)
   }
}
//login data
exports.loginUser= async(req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;

    try {
        let user = await User.findOne({
            email : email
        });

        if(!user){
            res.json({
                success : true,
                message : 'User not exist go & register to continue'
            })
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                success : false,
                message : 'Invalid password'
            })
        }


        const paylode = {
            user :{
                id : user.id
            }
        }

        jwt.sign(paylode, process.env.jwtUserSecret,{
            expiresIn : 360000
        },(err, token)=>{
            if(err) throw err;
            res.status(200).json({
                success : "true",
                message : 'User Loged In',
                token : token,
                user : user
        })
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success : false,
            message : 'Server error'
        })
    }
}

exports.getUser = async (req,res)=>{
    try {
        const users = await User.find();
        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Try again"
        })
    }
}



//search users
// router.get('/query',async (req,res,next) => {
//     try {
//         const user = await User.find({username : req.body.username}) 
//         if(!user){
//             res.status(400).json({
//                 success : false,
//                 message : 'oops! Try again'
//             })
//         }
//         res.status(200).json({
//             success : true,
//             message : 'find successfully',
//             user : user
//         })

//     } catch (error) {
        
//     }
// })

// module.exports = router;