const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BuoySchema = new Schema({
    status: {
        type: String,
        enum: ["ON_LIGNE", "REPERING", "OFF_LIGNE", "BROKEN"],
        default: "OFF_LIGNE"
    },
    num: {
        type: String,
        unique: true
    },
    lat: {
        type: Number,
        default: 36.8065
    },
    lng: {
        type: Number,
        default: 10.1815
    },
    meteos: [
        {
            type: Schema.Types.ObjectId,
            ref: "meteo"
        }
    ],
    plage: {
        type: Schema.Types.ObjectId,
        ref: "plage"
    },
    detecs:[ {
        type: Schema.Types.ObjectId,
        ref: 'detec'
    }]
});

module.exports = Buoy = mongoose.model("buoy", BuoySchema);
