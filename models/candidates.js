const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    candidateID: {
        type: String,
        required: true,
        unique: true
    },
    party: {
        type: String,
        required: true,
        enum: ["BJP","TMC","CONG","CPIM"]
    },
    // votes: {
    //     user: {
    //         // type: mongoose.Schema.Types.ObjectId,
    //         // ref: user,
    //         // required: true
    //     }
    // },
    voteCount: {
        type: Number,
        default: 0
    }

})

const Candidate = mongoose.model('Candidate',CandidateSchema);

module.exports = Candidate;