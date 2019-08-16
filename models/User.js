const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type:       String,
        required:   true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image:{
        type: String
    },
    type:{
        type: String,
        //enum: ['asd']
        
    },
    lat:{
        type: String
    },
    lng:{
        type: String
    },
    age:{
        type: Number
    },
    adress: {
        pays:{
            type: String,
        },
        ville:{
            type: String,
        },
        cite:{
            type: String,
        },
        zip:{
            type: Number,
        }
    },
    follows:[{
        plage:{
            type: Schema.Types.ObjectId,
            ref: 'plage'
        }
    }],
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = User = mongoose.model('user',UserSchema);