const express = require("express");
const router = express.Router();

const Plage = require("../../models/Plage");
const Buoy = require("../../models/Buoy");
const auth = require("../../middleware/auth");

// @route   Get api/plages
// @desc    Get All  plages
// @access  Public

router.get("/", async (req, res) => {
    try {
        const plages = await Plage.find().select('_id nom ville mainImage rates');
        p=[];
        plages.forEach((plage)=>{
            //plage = plage.toObject;
            const rates = plage.rates.map(rate=>rate.rate)
            const rate = rates.reduce((previous, current) => current += previous,0)/rates.length;
            plage = plage.toObject();
            plage.rate=rate
            delete plage.rates
            p.unshift(plage);
        })
       // const obj = plages.rates.map(rate=>rate.rate).reduce((previous, current) => current += previous)/palge.rates.length();
        
        
        res.json(p);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
});

// @route   Get mob/plage/location
// @desc    Get All  plages with location
// @access  Public

router.get("/location", async (req, res) => {
    try {
        const plages = await Plage.find().select('_id nom ville lat lng');
        res.json(plages);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
});

// @route   Get api/plage/id
// @desc    Get plage with id
// @access  Public

router.get("/:id", async (req, res) => {
    try {
        const plage = await Plage.findById(req.params.id);
        if(!plage){
            return res.status(404).json({msg: "pas de plage"})
        }
        const buoys = await Plage.findById(req.params.id)
            .populate({
                path: "buoys",
                populate: {
                    path: "meteos",
                    model: "meteo",
                    options: { limit: 1, sort: { date: -1 } }
                }
            })
            .select("buoys");
        let meteo = {};
        if (buoys.buoys.filter(buoy=> buoy.status==="ON_LIGNE").length === 1) {
           // console.log(1)
            meteo = buoys.buoys.shift().meteos.shift();
        } else if(buoys.buoys.filter(buoy=> buoy.status==="ON_LIGNE").length > 1){
            const data = buoys.buoys.filter(buoy=> buoy.status==="ON_LIGNE" && buoy.meteos.length>0 ).map(buoy => buoy.meteos.shift());
           // console.log(2)
           if(data.length>0) {
            const obj = Object.entries(
                data.slice(1).reduce((res, curr) => {
                  return {
                        temp: res.temp + curr.temp,
                        humi: res.humi + curr.humi,
                        press: res.press + curr.press,
                        uv: res.uv + curr.uv,
                        diVent: res.diVent,
                        viVent: res.viVent + curr.viVent,
                        ph: res.ph + curr.ph,
                        tempEau: res.tempEau + curr.tempEau,
                        data: res.date
                    };
                }, data[0])
            );

            obj.forEach(function(val) {
                typeof val[1] === "number"
                    ? (meteo[val[0]] = val[1] / data.length)
                    : (meteo[val[0]] = val[1]);
            });
             }
        }
        const Oplage = plage.toObject();
        Oplage.meteo = meteo;

        return res.json(Oplage);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
});

// @route   PUT mob/plage/rate
// @desc    add or update rate on plage
// @access  Private

router.put("/rate", async (req, res) => {
    try {

        const plage = await Plage.findById(req.body.idPlage);
        if (!plage) return res.status(404).json({ msg: "Plage not found" });
        //check plage have been alredy rated
        if (
            plage.rates.filter(rate => rate.user.toString() === req.body.idUser)
                .length > 0
        ) {
            return res.status(400).json({ msg: "Post already rated" });
        } else {
            plage.rates.unshift({ user: req.body.idUser, rate: req.body.rate });
        }
        await plage.save();

        res.json(plage);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
});

module.exports = router;
