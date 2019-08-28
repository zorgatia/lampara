const express = require('express');
const router = express.Router();
const dummy = require('mongoose-dummy');
const ignoredFields = ['_id','created_at', '__v','ville','region','image','lat','lng','mainImage','etat','images',/detail/,/events/,/buoys/ ,'capacite','follows','date'];
const Plage = require('../../models/Plage')

router.post('/',async(req,res)=>{
    const nb = req.body.nb;
    let plages,plage
    for(i=0;i<20;i++){
        plages = dummy(Plage,{ignore: ignoredFields,returnDate: true})
        plage= new Plage(plages);
        await plage.save()
    }
    res.json(plages);
})
router.delete('/',async(req,res)=>{
    await Plage.deleteMany({nom:'test'})
    res.json('asd')
})

module.exports = router