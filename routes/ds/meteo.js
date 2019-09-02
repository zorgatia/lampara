const express = require("express");
const router = express.Router();

const Buoy = require('../../models/Buoy');
const Meteo = require('../../models/Meteo');
const Plage = require('../../models/Plage');


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
router.get('/plage',async (req,res) =>{

    try {
        const plage = await Plage.find()
        res.json(plage)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('server errr:'+err.message)

    }
})

module.exports = router