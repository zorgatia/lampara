const express = require('express');
const router = express.Router();

const User = require('../../models/User')
const Plage = require('../../models/Plage')
const Event = require('../../models/Event')

// @route   POST /mob/event
// @desc    Add Event
// @access  Public

router.post('/',async(req,res)=>{

    try {
        const user = await User.findById(req.body.user);
        if(!user){
            res.status(400).json({msg:'mafamech user'})
        }
        
        const plage = await Plage.findById(req.body.plage);
        if(!plage){
            res.status(400).json({msg:'mafamech plage'})
        }

        const newEvent = new Event({
            titre: req.body.titre,
            desc: req.body.desc,
            date: req.body.date,
            type: req.body.type,
            image: req.body.image,
            plage: plage,
            user: user,
        })

        const event = await newEvent.save();
        res.json(event)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('server error')
    }

})


// @route   PUT /mob/event/participer
// @desc    participer a un Event
// @access  Public

router.put('/participer',async(req,res)=>{
    try {
        const user = await User.findById(req.body.event);
        if(!user){
            res.status(400).json({msg:'mafamech user'})
        }
        const event = await Plage.findById(req.body.event);
        if(!event){
            res.status(400).json({msg:'mafamech event'})
        }

        const p = event.participants.map(user=>user.id).indexOf(req.body.user);
        if(p !== -1){
            event.participants.splice(p,1)
        }else{
            event.participants.unshift(user);
        }
        await event.save();
        res.json(event);

    } catch (err) {
        console.log(err.message)
        res.status(500).send('server error')
    }
})


// @route   GET /mob/event
// @desc    get all events
// @access  Public

router.get('/',async(req,res)=>{
    try{
        const events = await Event.find();
        res.json(events)
    }catch (err) {
        console.log(err.message)
        res.status(500).send('server error')
    }
})

// @route   GET /mob/event
// @desc    get all events
// @access  Public

router.get('/:id',async(req,res)=>{
    try{
        const event = await Event.findById(req.params.id);
        res.json(event)
    }catch (err) {
        console.log(err.message)
        res.status(500).send('server error')
    }
})

module.exports = router