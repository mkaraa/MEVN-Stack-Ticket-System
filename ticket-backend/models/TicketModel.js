const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TicketModel = new Schema({
    user_id: {
       type: String
    },
    user_name:{
        type: String
    },
    user_role:{
        type: String
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: String,
        default: "Open"
    },
    files: {
        type: String
    },
    response:{
        type: String
    },
    responseFile:{
        type: String
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = Ticket = mongoose.model("tickets", TicketModel);