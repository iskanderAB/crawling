const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    description: {
        type: String,
        required:true,
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Users'
    },
},{
    timestamps:true
})

const Ticket = mongoose.model('Ticket',ticketSchema)

module.exports = Ticket