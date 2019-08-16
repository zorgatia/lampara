const express = require("express");
const router = express.Router();

const Buoy = require('../../models/Buoy')


// @route   Get mob/buoys
// @desc    Get All buoys
// @access  Public

router.get("/", async (req, res) => {
    try {
        const buoys = await Buoy.find();
        res.json(buoys);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
});


// @route   Get mob/buoy/:id
// @desc    Get Buoy with id
// @access  Public

router.get("/:id", async (req, res) => {
    try {
        const buoy = await Buoy.findById(req.params.id);
        res.json(buoy);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
});

// @route   Get mob/buoy/meteo/:id
// @desc    Get Buoy with id
// @access  Public

router.get("/meteo/:id", async (req, res) => {
    try {
        const buoy = await Buoy.findById(req.params.id);
        res.json(buoy);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
});


