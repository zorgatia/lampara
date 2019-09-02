const express = require("express");
const router = express.Router();

const Buoy = require('../../models/Buoy');
const Meteo = require('../../models/Meteo');


router.get('/buoy',async (req,res) =>{

    try {
        const buoy = await Buoy.find()
        res.json(buoy)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('server errr:'+err.message)

    }
})
router.get('/meteo',async (req,res) =>{

    try {
        const meteo = await Meteo.find()
        res.json(meteo)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('server errr:'+err.message)

    }
})

module.exports = router