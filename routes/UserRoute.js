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


// Login - POST
router.post('/login', async function (req, res) {
    try{
        const { aadharNumber, password } = req.query;

        //find the user in database and check if password matches
        const user = await userRoute.findOne({aadharNumber : aadharNumber})
        

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


// Profile -GET
router.get('/profile', jsonAuthMiddleware, async function(req,res) {
    try{
        const userData = req.DecodedData;

        const UserId = userData.id;

        const UserDetails = await userRoute.findById(UserId);

        console.log('User Details Fetched');
        res.status(200).json({Profile : UserDetails});

    }catch(err){
        console.log("Couldn't fetch userData");
        res.status(500).json({ error: "Internal Error Occured" });
    }
})


module.exports = router;