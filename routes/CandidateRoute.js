const express = require('express');
const router = express.Router();

const userRoute = require('../models/user');
const CandidateRoute = require('../models/candidates');
// const {jsonAuthMiddleware, generateToken} = require('./../jwt');


//Function to check if user is admin
const isAdmin = async (userID)=>{
    try{
        const findUser = await userRoute.findById(userID);
        return findUser.role === 'admin';
    }catch(err){
        return false;
    }
}


//Create Candidate
router.post('/', async function (req, res) {
    try {
        if(!isAdmin(req.DecodedData.id)){
            return res.status(404).json({message: "Only accessible for admins"})
        }
        
        const data = req.body; 

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


module.exports = router;