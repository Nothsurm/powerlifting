import express from 'express';
import MyUserController from '../controllers/MyUserController'

const router = express.Router();

router.post('/create', MyUserController.createUser)
router.post('/signin', MyUserController.loginUser)
router.post('/logout', MyUserController.logoutUser)

export default router;