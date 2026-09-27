import { Router } from "express";
import {getAll,getById,createUser,updateUser,deleteUser,loginUser} from '../controller/user.controller.js'
const router = Router();

// Specific routes MUST come before parameterized routes
router.route('/login').post(loginUser)

router.route('/').get(getAll)

router.route('/').post(createUser)

router.route('/:id').get(getById)

router.route('/:id').patch(updateUser)

router.route('/:id').delete(deleteUser)

export default router 
