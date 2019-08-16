const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
    rate:{
        type: Number
    },
    date:{
        type: Date,
        default: Data.now()
    }
})

module.exports = Rating = mongoose.model('rating',RatingSchema)