import { Router } from "express";
import { loginUser, addUser, getUsers, getProfiles, addProfile, checkUser } from "../Controllers/userController";
import { VerifyToken } from "../Middleware/verifyToken";

const router =Router()


router.post('/login',loginUser)
router.post('/signup', addUser)
router.get('/all',VerifyToken, getUsers)
router.get('/add/:id', addProfile)
router.get('/check',VerifyToken,checkUser)

export default router