const express = require('express');
const router = express.Router();

const userRoute = require('../models/user');
const CandidateRoute = require('../models/candidates');
const {jsonAuthMiddleware} = require('./../jwt');


//Update Vote count of candidate
router.post('/:CandidateID', jsonAuthMiddleware, async(req,res)=>{
    try{
        const CandidateID = req.params.CandidateID;
        const userID = req.DecodedData.id;

        const Candidate = await CandidateRoute.findOne({candidateID : CandidateID})
        if(!Candidate){
            return res.status(404).json({message: "Candidate not found"})
        }
        
        const Voter = await userRoute.findById(userID)
        if(!Voter){
            return res.status(404).json({message: "User not found"})
        }

        if(Voter.role==='admin'){
            return res.status(404).json({message: "Only Voters can Vote"})
        }

        if(Voter.isVoted){
            return res.status(404).json({message: "User has already voted"})
        }

        //Update the candidate document
        Candidate.voteCount++;
        //save the document
        await Candidate.save();

        //Update the User document
        Voter.isVoted = true;
        //save the document
        await Voter.save();

        res.status(200).json({message: "User Voted Successfully"})
    }catch{
        console.log("Error occured");
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router;