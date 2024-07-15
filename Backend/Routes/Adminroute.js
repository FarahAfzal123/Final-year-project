import express from 'express';
const router = express.Router();
import {adminuser, Login} from '../controller/admincontroller.js';

router.post('/login', Login);
router.post('/create', adminuser);

export default router;