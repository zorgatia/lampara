const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    titre:{
        type: String
    },
    desc:{
        type: String
    },
    type:{
        type: String,
        //enum: ['cleaning','sport']
    },
    date:{
        type: Date
    },
    plage:{
        type: Schema.Types.ObjectId,
        ref: "plage"
    },
    image:{
        type: String
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    participants:[
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ]
})
module.exports = Event = mongoose.model('event',EventSchema)