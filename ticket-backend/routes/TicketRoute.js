const express = require('express');
const router = express.Router();
const TicketController = require('../controllers/TicketController');

// Auth middleware
const verify = require('../middleware/auth');

// Upload file
const upload = require('../middleware/multer');

// @router POST create new ticket 
router.post('/createTicket',verify, upload.single('files'), TicketController.ticket_create);

// @router GET all created tickets
router.get('/getAllTickets',verify,TicketController.ticket_getAll);

// @router GET ticket by customername
router.get('/getTicketByCustomerName/:name',verify,TicketController.ticket_getByCustomerName);

// @router GET ticket by subject
router.get('/getBySubjectName/:subject',verify,TicketController.ticket_getBySubjectName);

// @router Get Ticket by ticket id
router.get('/getById/:id',verify,TicketController.ticket_getById);

// @router Get Ticket by ticket id
router.get('/getByStatus/:status',verify,TicketController.ticket_getByStatus);

// @router POST response to the ticket 
router.post('/responseTicket/:id',verify, upload.single('responseFile'),TicketController.ticket_responseTicket);

module.exports = router;