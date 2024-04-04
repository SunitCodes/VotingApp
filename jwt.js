const jwt = require('jsonwebtoken');
require('dotenv').config();


//Function to verify JWT
const jsonAuthMiddleware = (req,res,next) => {

    //First check if req header has authorization or not
    const authorization = req.headers.authorization;
    if(!authorization) return res.status(401).json({Error : "Token not found"})

    //Extract the jwt token from the request header
    const token = req.headers.authorization.split(' ')[1];

    if(!token){
        return res.status(401).json({error : "Unauthorized"});
    }

    try{
        //Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);

        //Attach user information to the req object
        //Attach decoded token to the req
        //JWTpayload is a new key which contains all user details
        req.DecodedData = decoded;
        next();

    }catch(err){
        console.log(err);
        res.status(401).json({error: "Invalid Token"});
    }

}



//Function to generate JWT
const generateToken = (userdata) => {
    //Generate a new JWT token using userdata
    return jwt.sign(userdata, process.env.JWT_SECRETKEY);
}


module.exports = {jsonAuthMiddleware, generateToken};