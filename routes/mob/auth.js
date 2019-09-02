const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const config = require ('config');
const {check, validationResult } = require('express-validator');

const User = require('../../models/User');


/*

[
    check('email','Please include a valid email').isEmail(),
    check('password','Password is required').exists()
    ]

    */

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public

router.post('/',async (req,res) => {
        
        const { email, password} = req.body;

        try{
            // See if user exists
            let user = await User.findOne({email});
            if(!user){
               return res.json({errors: 'Invalid Credentials'});
            }
            //Return jsonwebtoken
            const isMatch = await bcrypt.compare(password,user.password)
            if(!isMatch){
                return res
                   
                    .json({errors : 'Invalid Credentials' })
            }
            user = user.toObject();
            delete user.password;
            delete user.adress;
            res.json(user);
        }catch(err){
            console.error(err.message);
            res.status(500).send('Server error');
        }
        
});



module.exports= router;