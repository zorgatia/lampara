const mongoose = require('mongoose');
const Schema = mongoose.Schema
const RecSchema = new Schema({
    id:{
        type: Schema.Types.ObjectId
    },
    plages:[{
        type: Schema.Types.ObjectId,
        ref: 'plage'
    }]

})

module.exports = Rec = mongoose.model('rec',RecSchema)