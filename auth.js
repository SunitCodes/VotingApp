const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const UserModel = require('./models/user');


passport.use(new passportLocal(async (Username,Password,done)=>{
    //authentication logic
    try{
        const User = await UserModel.findOne({aadharNumber : Username});
        
        if(!User)
            return done(null,false, {message: "Incorrect Username"});

        const isPasswordMatch = await User.comparePassword(Password) ;
        if(!isPasswordMatch)
            return done(null,false, {message: "Invalid Password"});
        else
            return done(null, User, {message: "User Authenticated"});
        
    }catch(err){
        return done(res.status(401).json({message: "Internal Server Error"}));
    }
}))

module.exports = passport;