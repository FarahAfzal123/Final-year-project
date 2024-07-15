import express from 'express';
const router = express.Router();
import mail from '../controller/mailcontroller.js';

router.post('/mailsend', mail);

export default router;