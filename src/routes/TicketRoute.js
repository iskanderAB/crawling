const express = require('express')
const Ticket = require('../models/Ticket');
const router = new express.Router()

router.post('/tickets',async (req,res) =>{
    const task = new Ticket({...req.body,owner:req.user._id})
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(500).send(e.message)
    }
})
//pagination limit=10 skip=10
//sort
router.get('/tickets',async (req,res) => {
    const match = {}
    const sort = {}
    if(req.query.isCompleted){
        match.isCompleted = req.query.isCompleted === 'true'
    }
    if(req.query.sortBy){
        const str = req.query.sortBy.split(':')
        sort[str[0]] = str[1] === 'desc' ? -1:1
    }
    try {
        // const Ticket = await Ticket.find({owner:req.user._id})
        await req.user.populate({
            path:'Ticket',
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort
            }
        }).execPopulate();
        res.status(200).send(req.user.Ticket)
    }catch(e) {
        res.status(400).send(e.message)
    }
})

router.get('/Ticket/:id',async (req,res) => {
    try {
        const task = await Ticket.findByOne({_id:req.params.id,owner:req.user._id})
        if (!task)
           return  res.status(404).send()
        res.status(200).send(task)
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
        const task = await Ticket.findByOne({_id:req.params.id,owner:req.user._id})
        if(!task)
           return res.status(404).send()
        res.status(200).send(task)
    }catch(e){
        res.status(400).send()
    }
})

router.delete('/Ticket/:id',async (req,res) =>{
    try{
        const task = await Ticket.findByOne({ _id: req.params.id, owner: req.user._id })
        if (!task)
          return res.status(404).send()
        res.status(200).send(task)

    }catch(e){
        res.status(400).send()
    }
})
module.exports = router
