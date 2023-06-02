require ('dotenv').config();
const mongoose = require('mongoose');
const db_url = process.env.DB_URL;

const connect = function(){
    console.log(db_url);
    mongoose.connect(db_url).then((val)=>{
    console.log('Database has connected');
   }).catch((err)=>{
    console.log("Error on connecting database");
   })
}

module.exports=connect;