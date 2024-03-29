const mongoose = require('mongoose');
require('dotenv').config();

// Define Mongodb connection url
const MongoURL = process.env.LOCAL_URL;

// Setup Mongodb connection

mongoose.connect(MongoURL);

//Get the default connection

const db = mongoose.connection;


// Event Listeners

db.on('connected', ()=>{
    console.log("Connected to MongoDB server");
})

db.on('disconnected', ()=>{
    console.log("Disconnected from MongoDB server");
})

db.on('error', (err)=>{
    console.log("Connection failed due to an error", err);
})

module.exports = db ;