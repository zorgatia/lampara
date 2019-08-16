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
        type: Number
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
    visibilite: {
        type: String
    },
    ph: {
        type: Number
    },
    tempEau: {
        type: Number
    },
    salerite: {
        type: Number
    }
});

module.exports = Meteo = mongoose.model("meteo", MeteoSchema);
