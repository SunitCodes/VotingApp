const express = require('express');
const router = express.Router();


const userRoute = require('../models/user');
const {jsonAuthMiddleware, generateToken} = require('./../jwt');

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

router.get('/signup', async (req, res) => {
    try {
        const response = await userRoute.find();
        console.log("Data Fetched");
        res.status(200).json(response);
        
    } catch (err) {
        console.log("Error occured");
        res.status(500).json({ error: "Internal Error Occured" });
    }
})

module.exports = router;