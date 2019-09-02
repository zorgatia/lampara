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
               return res
              
               .json({errors: 'Invalid Credentials'});
            }
            //Return jsonwebtoken
            const isMatch = await bcrypt.compare(password,user.password)
            if(!isMatch){
                return res
                   
                    .json({errors : 'Invalid Credentials' })
            }
            user = user.toObject();
            delete user.password;
            res.json(user);
        }catch(err){
            console.error(err.message);
            res.status(500).send('Server error');
        }
        
});

// a refaire

// @route   POST api/auth/google
// @desc    Authenticate user & get token with google
// @access  Public

router.post('/',async (req,res) => {
        const { email } = req.body;
        try{
            // See if user exists
            let user = await User.findOne({email});
            if(!user){
               return res
               .status(400)
               .json({errors: [{ msg : 'Invalid Credentials'} ]});
            }

            //Return jsonwebtoken

            const isMatch = await bcrypt.compare(password,user.password)

            if(!isMatch){
                return res
                    .status(400)
                    .json({errors : [{msg: 'Invalid Credentials'}] })
            }

            const payload = {
                user:{
                    id: user.id
                }
            };

            user.password = null;

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000 },
                (err,token)=>{
                    if(err) throw err;
                    res.json(user);
                } 
            );
            
        }catch(err){
            console.error(err.message);
            res.status(500).send('Server error');
        }
        
});

module.exports= router;