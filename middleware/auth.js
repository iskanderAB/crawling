const jwt = require('jsonwebtoken')
const User = require('../src/models/User');
const auth = async (req,res,next) =>{
   try{
       const token = req.header('Authorization').replace('Bearer ', '')
       console.log(token)
       const decode = await jwt.verify(token, 'abirSecretKey')
       const user = await User.findOne({ _id: decode._id, 'tokens.token': token })
       if(!user)
        throw new Error()
    req.token = token
    req.user = user;
    next();
   }catch(e){
       res.status(401).send({error:"authentication ☠️"})
   }
}

module.exports = auth