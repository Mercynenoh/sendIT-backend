import { Router } from "express";
import { loginUser, addUser, getUsers, getProfiles, addProfile } from "../Controllers/userController";
import { VerifyToken } from "../Middleware/verifyToken";

const router =Router()


router.post('/login',loginUser)
router.post('/signup', addUser)
router.get('/check',VerifyToken)
router.get('/all', getUsers)
router.get('/add/:id', addProfile)
router.get('/profiles', getProfiles)

export default router