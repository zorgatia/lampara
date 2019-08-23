const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type:       String,
        
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
    nom:{
        type: String
    },
    prenom:{
        type: String
    },

    image:{
        type: String,
        default: "https://res.cloudinary.com/orange-odc/image/upload/v1566554496/users/default.jpg"
    },
    type:{
        type: String,
        enum: ['USER','ADMIN','SUPER_ADMIN']
    },
    lat:{
        type: String
    },
    lng:{
        type: String
    },
    dateNaissance:{
        type: Date
    },
    comfirmed:{
        type: Boolean
    },
    adress: {
        pays:{
            type: String,
            default: "Tunisie"
        },
        region:{
            type: String,
        },
        cite:{
            type: String,
        },
        zip:{
            type: Number,
        },
        adress:{
            type: String
        }
    },
    goings:[{
        plage:{
            type: Schema.Types.ObjectId,
            ref: 'plage'
        },
        date:{
            type: Date,
        }

    }],
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