const express = require('express');
const Ticket = require('../models/Ticket');
const router = new express.Router();
const auth = require('../../middleware/auth');

router.post('/tickets',auth ,async (req,res) =>{
    const ticket = new Ticket({...req.body,owner:req.user._id})
    try{
        await ticket.save()
        res.status(201).send(ticket)
    }catch(e){
        res.status(500).send(e.message)
    }
})

router.get('/tickets',auth , async(req, res)=> {
    let tickets ;
    try{
        const { roles, _id } = req.user;
        if(roles.includes('role_admin')){
            tickets = await Ticket.find();
        }
        else{
            tickets = await Ticket.find({
                owner: _id
            })
        }
        res.status(200).send(tickets);
    }catch(e){
        res.status(400).send("error")
    }
})

router.get('/Ticket/:id',async (req,res) => {
    try {
        const ticket = await Ticket.findByOne({_id:req.params.id,owner:req.user._id})
        if (!ticket)
           return  res.status(404).send()
        res.status(200).send(ticket)
    }catch(e){
        res.status(400).send()
    }
})

router.patch('/Ticket/:id',async (req,res) => {
    const allowedUpdates = ['name','isCompleted']
    const keys = Object.keys(req.body);
    const isUpdationValid = keys.every(key => allowedUpdates.includes(key))
    if(!isUpdationValid)
    res.status(400).send()
    try {
        const ticket = await Ticket.findByOne({_id:req.params.id,owner:req.user._id})
        if(!ticket)
           return res.status(404).send()
        res.status(200).send(ticket)
    }catch(e){
        res.status(400).send()
    }
})

router.delete('/Ticket/:id',async (req,res) =>{
    try{
        const ticket = await Ticket.findByOne({ _id: req.params.id, owner: req.user._id })
        if (!ticket)
          return res.status(404).send()
        res.status(200).send(ticket)

    }catch(e){
        res.status(400).send()
    }
})
module.exports = router
