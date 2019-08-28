const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const auth = require("../../middleware/auth");

const User = require("../../models/User");
const Plage = require("../../models/Plage");

// @route   POST mob/user
// @desc    Register user
// @access  Public

/*[
    check("username", "username is required")
    .not()
    .isEmpty(),
check("email", "Please include a valid email").isEmail(),
check(
    "password",
    "Please enter a password with 6 or more characters"
).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/)
]*/

router.post(
  "/",

  async (req, res) => {
    /* const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }*/
    const { username, email, password, lat, lng } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }


      user = new User({
        username,
        email,
        password,
        lat,
        lng,
        type: 'USER'
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      //Return jsonwebtoken

      const payload = {
        user: {
          id: user.id
        }
      };
      user.password = null;
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json(user);
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   GET mob/user/me
// @desc    Get current users
// @access  Private

router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(400).json({ msg: "There is no user" });
    }
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET mob/user/all
// @desc    get all users
// @access  Public

router.get("/all", async (req, res) => {
  try {
    const users = await User.find().select("username image");
    res.json(users);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("error server");
  }
});

// @route   GET api/user/verifyemail
// @desc    check if email exist
// @access  Public
router.get("/verifyemail/:email", async (req, res) => {
  const email = req.params.email;
  let user = await User.findOne({ email });
  if (user) return res.json({ exist: true });
  res.json({ exist: false });
});

// @route   GET mob/user/:user_id
// @desc    get user by ID
// @access  Public

router.get("/:user_id", async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id).select("-password");

    if (!user)
      return res.status(404).json({ mgs: "there is no profile for this user" });
    res.json(user);
  } catch (err) {
    console.log(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "profile not found" });
    }
    res.status(500).send("error server");
  }
});

// @route   DELETE api/profile
// @desc    delete profile ,user & posts
// @access  Private

router.delete("/", auth, async (req, res) => {
  try {
    // remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: " user removed" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("error server");
  }
});

// @route   PUT api/user/profile
// @desc    delete profile ,user & posts
// @access  Private
router.put(
  "/profile",
  [
    auth,
    [
      check("age", "age is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { age, pays, ville, cite, zip } = req.body;

    const newAddress = {
      pays,
      ville,
      cite,
      zip
    };

    try {
      const user = await User.findById(req.user.id);
      user.age = age;
      user.adress = newAddress;
      await user.save();
      res.json(user);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  }
);

// @route   PUT api/user/follow
// @desc    put follow on plage
// @access  Private

router.put("/follow", async (req, res) => {
  try {
    const plage = await Plage.findById(req.body.idPlage);
    if (!plage) return res.status(404).json({ msg: "Plage don t found" });
    // test if user have already followed plage
    const user = await User.findById(req.body.idUser);
    const index = user.follows.map(p => p.id).indexOf(plage.id);
    if (index !== -1) {
      user.follows.splice(index, 1);
      await user.save();
      res.json({ msg: "deleted" });
    } else {
      user.follows.unshift(plage);
      await user.save();
      res.json({ msg: "added" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

// @route   PUT mob/user/going
// @desc    change password
// @access  Private

router.put("/going", async (req, res) => {
  try {
    const plage = await Plage.findById(req.body.plage);
    if (!plage) return res.status(404).json({ msg: "plage mich mayjouda" });

    const user = await User.findById(req.body.user).select("goings");
    if(!user) return res.status(404).json({msg:'user 8alit'})
    // user.going.sort((a,b)=>a.date.getTime()-b.date.getTime());
    if(!user.goings) return res.status(404).json({msg:'user ma3andouch going'})
    if (user.goings.filter(going => going.date === req.body.date).length > 0)
      return res.status(404).json({ msg: "dejat mech plage o5ra" });
    const newGoing = {
      user: req.body.user,
      plage: req.body.plage,
      date: req.body.date
    };

    user.goings.unshift(newGoing);
    await user.save();
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

// @route   PUT mob/user/going/future/:id
// @desc    change password
// @access  Private

router.get("/going/future/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("goings")
      .populate("goings.plage", "nom ville mainImage");
      if(!user) return res.status(404).json({msg:'user 8alit'})
    result = [];
    user.goings.forEach(going => {
      result.push({
        idPlan: going._id,
        idPlage: going.plage._id,
        nomPlage: going.plage.nom,
        villePlage: going.plage.ville,
        mainImage: going.plage.mainImage,
        date: going.date
      });
    });
    res.json(result);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

// @route   DELETE mob/user/going/:user/:id
// @desc    delete going
// @access  Private


router.delete("/going/:id", async (req, res) => {
    const user =await User.findById(req.params.user).select('goings');
    const index=user.goings.map(g => g.id).indexOf(req.params.id);
    if(index===-1){
        res.json({ msg: "errrorrrrrrrrrrrrrrrrrr" });
    }else{
        user.goings.splice(index, 1);
        user.save();
        res.json({ msg: "deleted" });
    }
});

// @route   GET mob/user/follows
// @desc    change password
// @access  Private
router.get('/follows/:idUser',async (req,res)=>{
  try{
    const user = await User.findById(req.params.idUser);
    if (!user) return res.status(404).json({ msg: "pas de user" });
    

    const plages = await Plage.find({_id:{ "$in" : user.follows.map(f=>f.id)}}).select("_id nom ville mainImage rates");
    
    p = [];
    plages.forEach(plage => {
      //plage = plage.toObject;
      const rates = plage.rates.map(rate => rate.rate);
      const rate =
        rates.reduce((previous, current) => (current += previous), 0) /
        rates.length;
      plage = plage.toObject();
      plage.rate = rate;
      delete plage.rates;
      p.unshift(plage);
    });
    // const obj = plages.rates.map(rate=>rate.rate).reduce((previous, current) => current += previous)/palge.rates.length();

    res.json(p);

  }catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
})

module.exports = router;
