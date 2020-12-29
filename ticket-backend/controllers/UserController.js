const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const db = config.get('TOKEN_SECRET');

require('dotenv').config();

// Load data from a model schema
const User = require('../models/UserModel');
const Ticket = require('../models/TicketModel');

exports.users_register = (req, res) => {
    // Check user if it is exists
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            errors.email = 'Email already exists';
            return res.status(400).json(errors);
        } else {

            // Create new user model
            const newUser = new User({
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                password: req.body.password,
                company: req.body.company,
                role: req.body.role
            });

            // Hashing password
            bcrypt.genSalt(12, (err, salt) => {
                bcrypt.hash(newUser.password, salt, async (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    await newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log("Registration error", err));
                });
            });
        }
    });
};

exports.users_login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {
        // Check for user
        if (!user) {
            errors.email = 'User not found';
            return res.status(404).json(errors);
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = { _id: user._id }; // Create JWT Payload
                jwt.sign(
                    payload,
                    db,
                    (err, token) => {
                        res.json({
                            success: true,
                            token: token
                        });
                    }
                );
                res.header('auth-token', token).send(token);
            } else {
                return res.status(400).send('Email or Password is not correct! Try Again.');
            }
        });
    });
};

exports.users_create_ticket = async (req, res) => {

    const newTicket = new Ticket({
        name: req.body.name,
        description: req.body.description,
        files: req.file.path
    });

    try {
        await Ticket.create({
            newTicket
        });
        res.status(200).send('Ticket is created');
    } catch (error) {
        res.status(400).send('Server Error');
    }
};

exports.users_getAll = async (req, res) => {
    try {
        await User
            .find({role:1})
            .sort({ name: -1 })
            .then((users) => {
                res.status(200).send(users);
            });
    } catch (error) {
        res.status(500).send(error.toString());
    }
}

exports.users_getUserById = async ( req,res) => {
        let user = User.findOne({_id: req.params.id});

        if(!user){
            res.status(500).send('No available User');
        } else {
            await User.findOne({_id: req.params.id}).then((userInfo) => {
                res.status(200).send(userInfo);
            });
        }
}