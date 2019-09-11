const express = require('express');
const router = express.Router();

const User = require('../../models/User')
const Plage = require('../../models/Plage')
const Buoy = require('../../models/Buoy')


router.get('/',async (req,res)=>{
    res.json([10,0,0,0,0,6,0,0,0,10,0,0,0,0,120])
})

router.get('/dash',async(req,res)=>{
    const users = await User.countDocuments({role:'USER'})
    const plages = await Plage.countDocuments()
    const buoys = await Buoy.countDocuments({status:'ON_LIGNE'})
    res.json({users,plages,buoys})
})

router.get('/:region',async(req,res)=>{
    
})

module.exports= router;