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

// @route   POST web/user
// @desc    Register user
// @access  Public

router.post(
  "/",
  [
    check("username", "username is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/)
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      const image = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      user = new User({
        username,
        email,
        image,
        password
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

          res.json({token});
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   GET web/user/me
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

// @route   GET web/user/all
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

// @route   GET web/user/:user_id
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
  "/profile",auth,
  async (req, res) => {
    
    
    const { dateNaissance, adress, region, cite, zip,nom,prenom } = req.body;

    const newAddress = {
      adress,
      region,
      cite,
      zip
    };

    try {
      const user = await User.findById(req.user.id);
      
      user.nom = nom;
      user.prenom = prenom;
      user.dateNaissance = dateNaissance;
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

router.put("/follow/:id", auth, async (req, res) => {
  try {
    const plage = await Plage.findById(req.params.id);
    if (!plage) return res.status(404).json({ msg: "Plage don t found" });
    // test if user have already followed plage
    const user = await User.findById(req.user.id);
    const index = user.follows.map(p=>p.id).indexOf(plage.id);
    if(index !== -1){
        user.follows.splice(index,1);
        user.save();
        res.json({msg: "deleted"})
    }else{
        user.follows.unshift(plage);
        user.save();
        res.json({msg: "added"})
    }
    


  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

// @route   POST web/user/changepassword
// @desc    change password
// @access  Private
router.post("/changepassword",auth, async (req,res)=>{

  try {
   // console.log('bla')
    const user = await User.findById(req.user.id).select('password')
    const isMatch = await bcrypt.compare(req.body.oldPassword,user.password);
    if(!isMatch){
      return res
          .status(400)
          .json({errors : [{msg: 'mot de passe incorrect'}] })
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.newPassword, salt);
   
    await user.save();
    res.json({msg: 'mot de passe change avec success'})

  }  catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }


})
module.exports = router;
