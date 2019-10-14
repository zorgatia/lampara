const express = require("express");
const router = express.Router();

const Plage = require("../../models/Plage");
const Buoy = require("../../models/Buoy");
const auth = require("../../middleware/auth");
const Detec = require("../../models/Detec");
const Prev = require("../../models/Prev")





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

// @route   Put web/buoy/location
// @desc   Add Buoy to plage
// @access  Public

router.post("/:id", async (req, res) => {
    try {
        console.log(1)
        let plage = await Plage.findById(req.params.id)
        if(!plage) return res.status(404).json({msg:'error plage mich mayjouda'})
        console.log(11)
        const buoys = await Buoy.find({num: req.body.num})
        if(buoys.length>0) return res.status(404).json({msg:'error num buoy mayjouda'})
       console.log(2)
        const newBuoy= new Buoy({
            num: req.body.num,
            lat: plage.lat,
            lng: plage.lng,
            status: "OFF_LIGNE",
            plage: plage._id
        });
        
       
        const buoy = await newBuoy.save();
        console.log(buoy)
        plage.buoys.unshift(buoy)
        console.log(plage)
        plage= await plage.save()
        console.log(plage)
        return res.json(plage);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
});


router.put('/detec/:id',async (req,res)=>{

    try {
        
        const buoy = await Buoy.findOne({num: req.params.id})
        if(!buoy) return res.status(404).json('error buoy');

        const detec = new Detec({
            type: req.body.type
        })

        buoy.detecs.unshift(detec);
        await buoy.save();
        res.json(buoy)

    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
})

router.put('/prev/:id',async(req,res)=>{
    try {
        const plage = await Plage.findById(req.params.id)
        // console.log(buoy);
        let flag, cloudy;
    
        if (!plage) {
          return res.status(404).json({ msg: "no meteo" });
        }
      
        const met = {
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
        };

        let prev = await Prev.findOne({plage: plage.id})
        if(!prev){
            prev = new Prev({
                plage: plage,
                prevs:[met]
            })
        }else{
            console.log(prev)
            prev.prevs.unshift(met)
        }
        
       const ress= await prev.save()
        res.json(ress)
      } catch (err) {
        console.error(err.message);
      }
})



module.exports = router