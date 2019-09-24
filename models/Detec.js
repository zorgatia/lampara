const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DetecSchema = new Schema({

    type: {
        type:String,
        enum:['NAVIR','ECOSYS']
    },
    date:{
        type:Date,
        default: Date.now
    }
});

module.exports = Detec = mongoose.model("detec", DetecSchema);