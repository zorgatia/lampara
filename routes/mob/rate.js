const express = require("express");
const router = express.Router();

const Plage = require("../../models/Plage");
const User = require("../../models/User");




router.get('/:idUser/:idPlage',async(req,res)=>{
    const user = await User.findById(req.params.idUser)
    const plage = await Plage.findById(req.params.idPlage)

    rate = plage.rates.map(r=>r.user).indexOf(user.id)
    if(rate!= -1) return res.json(plage.rates[rate])
    else return res.json(rate)
})