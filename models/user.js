const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    aadharNumber: {
        type: Number,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    mobileNo: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: ["voter","admin"]
    },
    isVoted: {
        type: Boolean,
        default: false
    }

})


UserSchema.pre('save',async function(next){
    const user = this; 

    if(!user.isModified('password'))
        return next();
    
    try{
        
        // Hash generation
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(user.password, salt);

        //override the plain password
        user.password = hashedPassword;
        next();
        
    }catch(err){
        return next(err);
    }
})


// This function will check if password matches the existing hashed password stored in database
UserSchema.methods.comparePassword = async function(userPassword){
    try{
        const isMatch = await bcrypt.compare(userPassword, this.password);
        return isMatch;

    }catch(err){
        throw err;
    }
}


const User = mongoose.model('User',UserSchema);

module.exports = User;