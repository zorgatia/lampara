const express = require("express");
const router = express.Router();


const Plage = require('../../models/Plage');

// @route   POST ds/rate
// @desc    get all rates
// @access  Public

router.get("/", async (req, res) => {
    try {
        const plages = await Plage.find().select("_id rates");
        const palges = plages.filter(plage=>plage.rates.length>0);
        rates=[];
        plages.forEach(plage=>{
            plage.rates.forEach(rate=>
                rates.unshift({idPlage:plage._id,idUser:rate.user,rate:rate.rate})
            )

        })
        res.json(rates);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});



module.exports = router