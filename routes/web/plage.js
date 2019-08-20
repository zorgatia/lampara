const express = require("express");
const router = express.Router();

const Plage = require("../../models/Plage");
const auth = require("../../middleware/auth");

// @route   POST web/plage
// @desc    Create a Plage
// @access  Public
router.post("/", async (req, res) => {
    try {
        const newPlage = new Plage({
            nom: req.body.nom,
            ville: req.body.ville,
            etat: req.body.etat,
            lat: req.body.lat,
            lng: req.body.lng,
            capacite: req.body.capacite,
            mainImage: req.body.mainImage
        });

        const plage = await newPlage.save();
        res.json(plage);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
});

// @route   Get web/plage
// @desc    Get All  plages
// @access  Public

router.get("/", async (req, res) => {
    try {
        const plages = await Plage.find();
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
        res.json(plage);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
});

// @route   PUT api/plage/rate/:id/:rate
// @desc    add or update rate on plage
// @access  Private

router.put("/rate/:id/:rate", auth, async (req, res) => {
    try {
        const plage = await Plage.findById(req.params.id);
        if (!plage) return res.status(404).json({ msg: "Plage not found" });
        //check plage have been alredy rated
        if (
            plage.rates.filter(rate => rate.user.toString() === req.user.id)
                .length > 0
        ) {
            return res.status(400).json({ msg: "Post already rated" });
        } else {
            plage.rates.unshift({ user: req.user.id, rate: req.params.rate });
        }
        await plage.save();

        res.json(plage);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
});

// @route   PUT api/plage/unrate/:id
// @desc    remove rate from plage
// @access  Private

router.put("/unrate/:id", auth, async (req, res) => {
    try {
        const plage = await Plage.findById(req.params.id);
        if (!plage) return res.status(404).json({ msg: "Plage not found" });
        //check plage have been alredy rated
        if (
            plage.rates.filter(rate => rate.user.toString() === req.user.id)
                .length === 0
        ) {
            return res.status(400).json({ msg: "Post not rated" });
        }

        const index = plage.rates
            .map(rate => rate.user.toString())
            .indexOf(req.user.id);
        plage.rates.splice(index, 1);
        await plage.save();

        res.json(plage);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
});

// @route   POST api/plage/buoy/:id
// @desc   add buoy to plage
// @access  Public // tochange

router.post("/buoy/:id", async (req, res) => {
    try {
        const plage = await Plage.findById(req.params.id).populate("buoys");
        if (!plage) return res.status(404).json({ msg: "Plage not found" });
        //check buoy alread addeed
        if (await Buoy.count({ num: req.body.num })>0) {
            return res.status(400).json({ msg: "Buoy aready exist" });
        }

        const newBuoy = new Buoy({
            num: req.body.num,
            status: req.body.status,
            plage: plage
        });
        const buoy = await newBuoy.save();
        plage.buoys.unshift(buoy._id);
        await plage.save();

        res.json(plage);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
});

module.exports = router;
