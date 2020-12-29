const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Auth middleware
const verify = require('../middleware/auth');

// Upload file
const upload = require('../middleware/multer');

// @route POST Register
router.post('/register', UserController.users_register);

// @route POST Login
router.post('/login', UserController.users_login);

// @route GET all users
router.get('/getAllUsers',UserController.users_getAll);

// @route GET user by id
router.get('/getUserById/:id',UserController.users_getUserById);

module.exports = router;