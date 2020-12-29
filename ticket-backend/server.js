const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 5000;
const app = express();

const verify = require('./middleware/auth');

//import routes
const userRouter = require('./routes/UserRoute');
const ticketRouter = require('./routes/TicketRoute');
const { log } = require('console');

// CORS Permissions 
app.use(cors());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Helmet secures by setting various HTTP headers
app.use(helmet());

// Connect MongoDB
connectDB(); 

// use router
app.use('/ticket/api/',userRouter);
app.use('/ticket/api/',ticketRouter);

// ticket files
app.use("/public", express.static(path.join(__dirname, 'public')));

// Test
app.get("/",verify,(req,res) => {
    console.log(req.user.id + ' is logged');
    res.send("Node server is running");
});

app.listen(PORT, () => console.log(`Server is running port ${PORT}`));