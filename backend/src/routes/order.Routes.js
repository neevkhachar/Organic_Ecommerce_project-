import { Router } from "express";
import { getAllOrder, getByIdOrder, updateOrder, deleteOrder,createOrder } from "../controller/order.controller.js"
import authenticateUser from '../middlewares/authMiddleware.js'

const router = Router();

router.route('/').get(authenticateUser,getAllOrder)

router.route('/:id').get(getByIdOrder)

router.route('/').post(authenticateUser,createOrder)

router.route('/:id').patch(updateOrder)

router.route('/:id').delete(deleteOrder)

export default router