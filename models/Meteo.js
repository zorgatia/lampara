const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MeteoSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    temp: {
        type: Number
    },
    humi: {
        type: Number
    },
    press: {
        type: Number
    },
    uv: {
        type: Number,
        default:0
    },
    diVent: {
        type: String,
        enum: [
            "N",
            "NNE",
            "NE",
            "ENE",
            "E",
            "ESE",
            "SE",
            "SSE",
            "S",
            "SSW",
            "SW",
            "WSW",
            "W",
            "WNW",
            "NW",
            "NNW"
        ]
    },
    viVent: {
        type: Number
    },
    ph: {
        type: Number
    },
    tempEau: {
        type: Number
    },
    salerite: {
        type: Number,
        default:0
    },
    flag:{
        type:Number,
        enum:[1,2,3]
    },
    cloudy:{
        type:Number,
        enum:[1,2,3]
    },
    crowded:{
        type:Number,
        enum:[1,2,3]
    }
});

module.exports = Meteo = mongoose.model("meteo", MeteoSchema);
