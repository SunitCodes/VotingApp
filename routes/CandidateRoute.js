const express = require('express');
const router = express.Router();

const userRoute = require('../models/user');
const CandidateRoute = require('../models/candidates');
const {jsonAuthMiddleware} = require('./../jwt');


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
router.post('/', jsonAuthMiddleware, async(req, res) =>{
    try {
        if(!isAdmin(req.DecodedData.id)){
            return res.status(404).json({message: "Only accessible for admins"})
        }
        
        const data = req.body; 

        //Create a new Person document using mongoose model
        const newCandidate = new CandidateRoute(data);

        //Save the new Person to database
        const savedData = await newCandidate.save();
        console.log("Data Saved");
        res.status(200).json({response: savedData});

    } catch (err) {
        console.log("Error occured");
        res.status(500).json({ error: "Internal Error Occured", err });
    }
})


//Update Candidate
router.put('/:id', jsonAuthMiddleware, async(req,res)=>{
    try{
        if(!isAdmin(req.DecodedData.id)){
            return res.status(404).json({message: "Only accessible for admins"})
        }

        const id = req.params.id;
        const data = req.body; //data that is to be updated

        const updatedData = await CandidateRoute.findByIdAndUpdate(id,data,{
            new: true ,
            runValidators: true 
        });

        if(!updatedData){
            console.log("Couldn't Update");
            return res.status(404).json({error: "Invalid person ID"});
        }
        console.log("Data Updated Successfully");
        res.status(200).json({message: "Updated successfully"});

    }catch{
        console.log("Error occured");
        res.status(500).json({ error: "Internal Server Error" });
    }
})


//Delete Candidate
router.delete('/:id', jsonAuthMiddleware, async(req,res)=>{
    try{
        if(!isAdmin(req.DecodedData.id)){
            return res.status(404).json({message: "Only accessible for admins"})
        }
        
        const id = req.params.id;
        console.log(id)

        const deletedData = await CandidateRoute.findByIdAndDelete(id);

        if(!deletedData){
            console.log("Deletion Failed");
            return res.status(404).json({error: "Invalid person ID"});
        }
        console.log("Data Deleted");
        res.status(200).json({message: "Person deleted successfully"});

    }catch{
        console.log("Error occured");
        res.status(500).json({ error: "Internal Server Error" });
    }
})


module.exports = router;