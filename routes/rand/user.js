const express = require('express');
const router = express.Router();
const dummy = require('mongoose-dummy');
const ignoredFields = ['_id','created_at', '__v','nom','prenom','image','type','lat','lng','dateNaissance','comfirmed',/adress/ ,'goings','follows','date'];
const User = require('../../models/User')

router.post('/',async(req,res)=>{
    const nb = req.body.nb;
    let users,user
    for(i=0;i<100;i++){
        users = dummy(User,{ignore: ignoredFields,returnDate: true})
        user= new User(users);
        await user.save()
    }
    res.json(users);
})

router.delete('/',async(req,res)=>{
    await User.deleteMany({role:'USER'})
    res.json('asd')
})

module.exports = router