const express = require('express');
const router = express.Router();


const userRoute = require('../models/user');
const {jsonAuthMiddleware, generateToken} = require('./../jwt');


// SignUp - POST
router.post('/signup', async function (req, res) {
    try {
        const data = req.body; 

        const newUser = new userRoute(data);
        const response = await newUser.save();

        const payload = {
            id : response.id
        }

        //generate token
        const token = generateToken(payload);
        
        console.log("Data Saved");
        console.log("Token generated is :",token);
        res.status(200).json({ response: response, token: token});

    } catch (err) {
        console.log("Error occured");
        res.status(500).json({ error: "Internal Error Occured", err });
    }
})

// router.get('/signup', async (req, res) => {
//     try {
//         const response = await userRoute.find();
//         console.log("Data Fetched");
//         res.status(200).json(response);
        
//     } catch (err) {
//         console.log("Error occured");
//         res.status(500).json({ error: "Internal Error Occured" });
//     }
// })


// Login - POST
router.post('/login', async function (req, res) {
    try{
        const { aadharNumber, password } = req.body;

        //find the user in database and check if password matches
        const user = await userRoute.findOne({aadharNumber : aadharNumber})
        
        if(user) console.log('YES')
        else console.log('NO')

        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({ message : "Invalid username or password"})
        }

        //if password matches - generate token
        const payload = {
            id : user.id
        }
        const token = generateToken(payload);
        
        console.log("Data Saved");
        console.log("Token generated is :",token);
        res.status(200).json({token: token});

    }catch(err){
        console.log("Error occured");
        res.status(500).json({ error: "Internal Error Occured", err });
    }
})


//


module.exports = router;