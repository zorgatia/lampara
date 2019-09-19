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
    const buoy = await Buoy.findOne({ num: req.params.id }).populate("meteos");
    // console.log(buoy);
    let flag, cloudy;

    if (!buoy) {
      return res.status(404).json({ msg: "no meteo" });
    }
    /*
    if (req.body.temp > 22 && req.body.temp < 33) flag = 1;
    else if (req.body.temp > 10 && req.body.temp < 40) flag = 2;
    else flag = 3;

    if (req.body.volt > 22 ) cloudy = 1;
    else if (req.body.volt > 10 ) cloudy = 2;
    else cloudy = 3;
*/
    const newMeteo = new Meteo({
      temp: req.body.temp,
      humi: req.body.humi,
      press: req.body.press,
      uv: req.body.uv,
      diVent: req.body.diVent,
      viVent: req.body.viVent,
      ph: req.body.ph,
      tempEau: req.body.tempEau,
      salarite: req.body.salarite,
      flag: req.body.flag,
      cloudy: req.body.cloudy,
      crowded: req.body.crowded
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
