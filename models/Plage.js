const mongoose = require('mongoose');
const Schema = mongoose.Schema

const PlageSchema = new Schema({
    nom:{
        type: String,
      //  enum: ['test']
    },
    ville:{
        type: String
    },
    region:{
        type: String,
    },
    lat:{
        type: Number
    },
    lng:{
        type: Number
    },
    mainImage:{
        type: String
    },
    images:[
        {
            type: String
        }
    ],
    etat:{
        type: String
    },
    capacite:{
        type: Number
    },
    detail:{
        parking: {
            type: Boolean,
            default: false
        },
        shower: {
            type: Boolean,
            default: false
        },
        resto: {
            type: Boolean,
            default: false
        },
        wc: {
            type: Boolean,
            default: false
        },
        bar: {
            type: Boolean,
            default: false
        },
        beachVolley: {
            type: Boolean,
            default: false
        },
        chienAdmis: {
            type: Boolean,
            default: false
        },
        parasol:{
            type:Boolean,
            default:false
        }
    },
    rates:[{
        user:{
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        rate:{
            type: Number,
            min:0,
            max:5
        }
    }],
    events:[
        {
            type: Schema.Types.ObjectId,
            ref : 'event'
        }
    ],

    buoys:[{
        type:Schema.Types.ObjectId,
        ref:'buoy'
    }],
    desc:{
        type: String
    },
    acti:[
        {
            type:String,
            enum:['Swimming','Surfing','Kayaking','Diving','Fishing']
        }
    ]
    
});

module.exports = Plage = mongoose.model('plage',PlageSchema);
