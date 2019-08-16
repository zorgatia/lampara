const express = require("express");
const router = express.Router();

const Meteo = require("../../models/Meteo");
const Buoy = require("../../models/Buoy");
const auth = require("../../middleware/auth");

// @route   PUT emp/buoy/meteo/:id
// @desc    add meteo data
// @access  Public

router.put("/meteo/:id", async (req, res) => {
    try {
        const buoy = await Buoy.findOne({ num: req.params.id }).populate(
            "meteos"
        );
        // console.log(buoy);

        if (!buoy) {
            return res.status(404).json({ msg: "no meteo" });
        }

        const newMeteo = new Meteo({
            temp: req.body.temp,
            humi: req.body.humi,
            press: req.body.press,
            uv: req.body.uv,
            diVent: req.body.diVent,
            viVent: req.body.viVent,
            ph: req.body.ph,
            tempEau: req.body.tempEau,
            salarite: req.body.salarite
        });

        const meteo = await newMeteo.save();
        buoy.meteos.unshift(meteo);
        await buoy.save();
        res.json(buoy);
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;
