const express = require('express');
const bodyParser = require('body-parser');
const database = require('./database');


const app = express();
app.use(bodyParser.json());
require('dotenv').config(); 


app.get('/',function(req,res){
    res.send("Welcome to our e-ballot");
})


const UserRoute = require('./routes/UserRoute');
app.use('/user', UserRoute);


const PORT = process.env.PORT || 3000; 

app.listen(PORT, ()=>{
    console.log(`Server running on PORT ${PORT}`);
})