import express from 'express';
const router = express.Router();
import { register, login, requireSignIn, deletecall,verifiedCode,Allstudents} from '../controller/Studentcontroller.js';

router.post('/register', register);
router.post('/login', login);
router.delete('/delete', deletecall);
router.get('/user-auth', requireSignIn);
router.post('/verifyemail',verifiedCode);
router.post('/allstudents', Allstudents)



export default router;