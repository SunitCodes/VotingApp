const express = require('express');
const router = express.Router();


const CandidateRoute = require('../models/candidates');
const {jsonAuthMiddleware, generateToken} = require('./../jwt');


//Function to check if user is admin

//Create Candidate
router.post('/', async function (req, res) {
    try {
        const data = req.body; //whatever data user is sending it is collected in req block


        //Create a new Person document using mongoose model
        const newCandidate = new CandidateRoute(data);

        //Save the new Person to database
        const savedData = await newPerson.save();
        console.log("Data Saved");

    } catch (err) {
        console.log("Error occured");
        res.status(500).json({ error: "Internal Error Occured", err });
    }
})