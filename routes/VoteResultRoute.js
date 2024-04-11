const express = require('express');
const router = express.Router();

const CandidateRoute = require('../models/candidates');

//This route is accessible for everyone

router.get('/', async(req,res)=>{
    try{
        const candidates = await CandidateRoute.find().sort({voteCount : 'desc'});

        const voteRecord = candidates.map((data)=>{
            return{
                party: data.party,
                voteCount: data.voteCount
            }
        })

        return res.status(200).json(voteRecord);
    }catch{
        console.log("Error occured");
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router;