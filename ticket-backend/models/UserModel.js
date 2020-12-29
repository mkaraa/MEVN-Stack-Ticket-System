const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserModel = new Schema({
    name: {
        type: String
    },
    surname: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    createdUserDate: {
        type: Date,
        default: Date.now
    },
    role:{
        type: String        // 0 = admin , 1 = User
    },
    company:{
        type: String
    }
});

module.exports = User = mongoose.model("users", UserModel);