import express from 'express';
const router = express.Router();
import { register, login, requireSignIn,forgetpassword,resetpassword, deletecall, verifiedCode} from '../controller/Trainercontroller.js';

router.post('/register', register);
router.post('/login', login);
router.delete('/delete', deletecall);
router.get('/user-auth', requireSignIn);
router.post('/forgetpassword',forgetpassword);
router.get('/reset-password/:Id/:token',resetpassword);
router.post('/verifyemail',verifiedCode)


export default router;