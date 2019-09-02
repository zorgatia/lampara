const express = require("express");
const router = express.Router();

const User = require('../../models/User')
const Plage = require('../../models/Plage')
const Buoy = require('../../models/Buoy')


router.get('/',async (req,res)=>{
    try {
        const result={}
        const nbUser = await User.countDocuments({role:'USER'});
        console.log(nbUser)
        result.nbUser=nbUser;
        res.json(result)



    } catch (err) {
        console.log(err.message);
        res.status(500).send('server errr:'+err.message)
    }
})

module.exports = router