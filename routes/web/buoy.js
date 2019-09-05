const express = require("express");
const router = express.Router();

const Plage = require("../../models/Plage");
const Buoy = require("../../models/Buoy");
const auth = require("../../middleware/auth");






// @route   Get web/buoy/location
// @desc    Get All  buoys 
// @access  Public

router.get("/location", async (req, res) => {
    try {
        const buoys = await Buoy.find().populate('plage').select('-meteos');
        res.json(buoys);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
});


module.exports = router