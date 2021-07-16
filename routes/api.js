const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const users = require('../models/user')


const mongoose = require('mongoose')
const db="mongodb+srv://priya_1:priya512@studentdata.ygkxx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"



mongoose.connect(db,{useNewUrlParser:true}).
then(()=> console.log("DB connected"))
.catch(err => console.error(err));


router.get('/', (req, res) => {
  res.send('From API route')
})

router.post('/register', (req, res)=>{
  let userData = req.body
  let user = new users(userData)
  user.save((error,registeredUser)=>{
    if(error){
      console.log(error);
    }else{
      let payload = {subject: registeredUser._id}
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({token})
    }
  })
})

router.post('/login', (req, res) => {
  let userData = req.body

  users.findOne({email: userData.email}, (error, user) =>{
    if(error){
      console.log(error)
    } else {
      if(!user){
        res.status(401).send('Invalid email')
      } else
      if( user.password !== userData.password){
        res.status(401).send('invalid password')
      }else {
        let payload = {subject: user._id}
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token})
      }
    }
  })
})

module.exports = router
