import express from 'express'
const router =  express.Router()
import {auth,Login} from '../controller/auth.js'
//Register 

router.post('/register',auth)


//LOG IN
router.post("/login",Login)

export default router