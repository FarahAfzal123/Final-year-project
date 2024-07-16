import express from 'express';
const router = express.Router();
import { register, login, requireSignIn,deletecall, verifiedCode} from '../controller/Trainercontroller.js';

router.post('/register', register);
router.post('/login', login);
router.delete('/delete', deletecall);
router.get('/user-auth', requireSignIn);
router.post('/verifyemail',verifiedCode)


export default router;