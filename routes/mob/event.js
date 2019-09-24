const express = require("express");
const router = express.Router();

const User = require("../../models/User");
const Plage = require("../../models/Plage");
const Event = require("../../models/Event");
const moment = require('moment')

// @route   POST /mob/event
// @desc    Add Event
// @access  Public

router.post("/", async (req, res) => {
  try {
    const user = await User.findById(req.body.user);
    if (!user) {
      res.status(400).json({ msg: "mafamech user" });
    }

    const plage = await Plage.findById(req.body.plage);
    if (!plage) {
      res.status(400).json({ msg: "mafamech plage" });
    }

    const newEvent = new Event({
      titre: req.body.titre,
      desc: req.body.desc,
      date: moment(req.body.date,"D.M.YYYY"),
      type: req.body.type,
      image: req.body.image,
      plage: plage,
      user: user
    });

    const event = await newEvent.save();
    res.json(event);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

// @route   PUT /mob/event/participer
// @desc    participer a un Event
// @access  Public

router.put("/participer", async (req, res) => {
  try {
    const user = await User.findById(req.body.user);
    if (!user) {
      res.status(400).json({ msg: "mafamech user" });
    }
    const event = await Event.findById(req.body.event);
    if (!event) {
      res.status(400).json({ msg: "mafamech event" });
    }

    const p = event.participants.indexOf(req.body.user);
    if (p !== -1) {
      event.participants.splice(p, 1);
      await event.save();
      res.json('annuler');
    } else {
      event.participants.unshift(user);
      await event.save();
      res.json('participe');
    }
    
    
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

// @route   GET /mob/event
// @desc    get all events
// @access  Public

router.get("/", async (req, res) => {
  try {
    const events = await Event.find().populate('plage','nom').sort({date:-1});
    res.json(events);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});



// @route   GET /mob/event/prev
// @desc    get all prev events
// @access  Public

router.get("/prev", async (req, res) => {
    try {
      const events = await Event.find({date:{$lt: new Date()}}).populate('plage','nom').sort({date:-1});
    const evs = events.map(e=>{
        let ev = e.toObject();
        ev.plage=ev.plage.nom;
        return ev;
    })
      res.json(evs);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  });

// @route   GET /mob/event/plage
// @desc    get special
// @access  Public

router.get("/plage/:idPlage/:idUser", async (req, res) => {
  try {
    const plage = await Plage.findById(req.params.idPlage);
    const user = await User.findById(req.params.idUser);

    const e = await Event.findOne({date:{$lt: new Date()},plage: plage,user:{$ne: user}}).populate('plage','nom').sort({date:-1});
  
      let ev = e.toObject();
      ev.plage=ev.plage.nom;
      
    res.json(ev);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});


// @route   GET /mob/event/upcome
// @desc    get all events
// @access  Public

router.get("/upcome", async (req, res) => {
    try {
      const events = await Event.find({date:{$gte: new Date()}}).populate('plage','nom').sort({date: 1});
      const evs = events.map(e=>{
        let ev = e.toObject();
        ev.plage=ev.plage.nom;
        return ev;
    })
      res.json(evs);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  });


// @route   GET /mob/event/upcome
// @desc    get all my events
// @access  Public

router.get("/my/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json('usre8 alit')
    const events = await Event.find({user: user.id}).populate('plage','nom').sort({date: 1});
    const evs = events.map(e=>{
      let ev = e.toObject();
      ev.plage=ev.plage.nom;
      return ev;
  })
    res.json(evs);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

// @route   GET /mob/event
// @desc    get all events
// @access  Public

router.get("/:id/:idUser", async (req, res) => {
  try {
    const user = await User.findById(req.params.idUser);
    if (!user) return res.status(404).json({ msg: "user 8alit" });
    const event = await Event.findById(req.params.id);
    let simEvent = await Event.find({ plage: event.plage });
    simEvent = simEvent.filter(e=>e.id!==event.id)
    let ev = event.toObject();
    
    if (!simEvent) {
      simEvent = await Event.find({ type: event.type });
      ev.simEvent = simEvent.indexOf(0);
    } else {
      const simType = simEvent.find(e => e.type === event.type);
      if (simType) {
        console.log("21");
        ev.simEvent = simType;
      } else {
        console.log("22");
        simEvent = simEvent.find(e => e.type !== event.type);
        ev.simEvent = simEvent;
      }
    }
    ev.joined=ev.participants.filter(p=> p !== user._id).length!==0;
    return res.json(ev);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

router.delete("/:id",async(req,res)=>{
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    console.log(event);
    res.json(event)
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
})

module.exports = router;
