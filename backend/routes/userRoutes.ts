import express from 'express';
import MyUserController from '../controllers/MyUserController'
import { authenticate } from '../middleware/authenticate';

const router = express.Router();

router.post('/create', MyUserController.createUser)
router.post('/signin', MyUserController.loginUser)
router.post('/logout', MyUserController.logoutUser)
router.post('/update', authenticate, MyUserController.updateUser)

export default router;