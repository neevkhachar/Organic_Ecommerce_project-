import { Router } from "express";
import { getMyCart, addToCart, updateCartItem, removeFromCart, clearCart } from "../controller/cart.controller.js";
import authenticateUser from '../middlewares/authMiddleware.js';

const router = Router();

// All cart routes require authentication
router.use(authenticateUser);

router.route('/').get(getMyCart);
router.route('/add').post(addToCart);
router.route('/update').patch(updateCartItem);
router.route('/remove/:productId').delete(removeFromCart);
router.route('/clear').delete(clearCart);

export default router;