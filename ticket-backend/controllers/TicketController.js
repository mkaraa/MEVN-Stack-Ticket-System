const config = require('config');

require('dotenv').config();

// Load data from a model schema
const User = require('../models/UserModel');
const Ticket = require('../models/TicketModel');

exports.ticket_create = async (req, res) => {
    let userName = "";
    let userRole = "";
    await User.findOne({ _id: req.user._id }).then((user) => {
        userName = user.name;
        userRole = user.role;
    });

    // Check file
    let responseFile = req.file;
    let file = req.file;
    if (!file) {
        file = ""
    } else {
        file = req.file.path;
        responseFile = ""
    }

    let response = req.body.response;
    if (!response) {
        response = "";
    } else {
        response = req.body.response;
    }

    try {
        const newTicket = new Ticket({
            user_id: req.user._id,
            user_name: userName,
            user_role: userRole,
            name: req.body.name,
            description: req.body.description,
            files: file,
            response: response,
            responseFile: responseFile
        });
        await newTicket.save().then((ticket) => {
            res.status(200).send(ticket);
        })
    } catch (error) {
        res.status(400).send('Server Error');
    }
};

exports.ticket_getAll = async (req, res) => {
    await Ticket.find()
        .sort({ createdDate: -1 })
        .then((tickets) => {
            res.status(200).send(tickets);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message
            })
        })
}

exports.ticket_getById = async(req,res) => {
    await Ticket.findById(
    {_id: req.params.id}
    ).then((response) => {
        res.status(200).send(response);
    }).catch((err) => {
        res.status(400).send(err.toString());
    })
}

exports.ticket_getByCustomerName = async (req, res) => {
    let name = req.params.name;

    let user = await Ticket.findOne({ user_name: name });
    if (!user) {
        res.send("User not found");
    } else {
        await Ticket.find({ user_name: name }).then((response) => {
            res.status(200).send(response)
        }).catch((err) => {
            res.status(500).send('Server Error');
        })
    }
}

exports.ticket_getByStatus = async (req, res) => {
    let status = req.params.status;
    
    let ticket = await Ticket.findOne({ status: status });
    if (!ticket) {
        res.send("Ticket not found");
    } else {
        await Ticket.find({ status: status }).then((response) => {
            res.status(200).send(response)
        }).catch((err) => {
            res.status(500).send('Server Error');
        })
    }
}

exports.ticket_getBySubjectName = async (req, res) => {
    let subject = req.params.subject;

    let ticket = await Ticket.findOne({ name: subject });
    if (!ticket) {
        res.send("Ticket not found");
    } else {
        await Ticket.find({ name: subject }).then((response) => {
            res.status(200).send(response)
        }).catch((err) => {
            res.status(500).send('Server Error');
        })
    }
}

exports.ticket_responseTicket = async (req, res) => {
    let ticket = await Ticket.findById({ _id: req.params.id });

    let file = req.file;
    if (!file) {
        file = ""
    } else {
        file = req.file.path;
    }
    if (!ticket) {
        res.status(400).send("Ticket not found");
    } else {
        try {
            await Ticket.findByIdAndUpdate(
                { _id: req.params.id },
                {
                    $set: {
                        response: req.body.response,
                        responseFile: file,
                        status: req.body.status
                    }
                }
                ).then((response)=>{
                    res.status(200).send(response);
            })
        } catch (error) {
            res.status(500).send('Server Error');
        }
    }
}