const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const auth = require('../../middleware/auth');




// login 
router.post('/login',async(req,res) => {
  try {
      const user = await User.findByCredentials(req.body.email,req.body.password)
      if(user){
        console.log("👌=> ",user)
        const token = await user.generateAuthToken();
        res.status(200).send({user,token})
      }
      else {
        res.status(401).send('unable to login ☠️')
      }
  }catch(e){
      res.status(400).send(e.message)
  }
})



router.post('/users',async (req ,res)=>{
    console.log("☠️ => ",req.body);
    try{
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      const user= new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        roles: ['role_user']
      });
      const result=await user.save();
      res.status(200).json(result);
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
})

router.get('/users',auth , async (req,res)=>{
  try{
      const data = await User.find();
      res.status(200).json(data);
  }
  catch(error){
   console.log(error);
  }
})

router.get('/users/:id',auth ,async (req,res)=>{
    try{
        const id = req.params.id;
        const data = await User.findById(id);
        if(data)
          res.status(200).json(data);
    }
    catch(error){
      res.status(404).send("not found !")
    }
})



router.delete('/users/:id',auth ,async (req,res)=>{
   try{ 
      const id = req.params.id;
      const result= await User.findByIdAndDelete(id);
      res.status(200).json({messge:"deleted succesfully"})
   }
   catch(err){
    res.status(404).send("not found !")
   }
})

router.put('/users/:id',auth ,async (req,res)=>{
    try{
        const id = req.params.id;
        const data = req.body;
        const options = {new:true};
        const result = await User.findByIdAndUpdate(id,data,options);
        res.status(200).json(result);
     }
     catch(error){
         res.status(500).json({error:error.message});
     }
})


module.exports= router;