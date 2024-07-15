import express from 'express';
const app = express();
import dotenv from 'dotenv';
import connectdb from './Database/db.js';
import studentroute from './Routes/Studentroute.js';
import trainerroute from './Routes/Trainerroute.js';
import mail from './Routes/mailroute.js';
import bodyParser from 'body-parser';
import adminlogin from './Routes/Adminroute.js';


dotenv.config();
connectdb();

// midleware
app.use(bodyParser.json())
app.use(express.json());


// Routing path
app.use('/api/v1/auth', studentroute)
app.use('/api/v1/trainer', trainerroute)
app.use('/api/v1/mail', mail)
app.use('/api/v1/admin', adminlogin)



const PORT = process.env.POR || 8081;
app.listen(PORT, () => {
    console.log(`Server is runung on Port ${PORT}`)
})