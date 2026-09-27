import { Router } from "express";
import { getAll, getById, createProduct, deleteProduct, updateProduct } from "../controller/product.controller.js";
const router = Router();

router.route('/').get(getAll)

router.route('/').post(createProduct)

router.route('/:id').get(getById)

router.route('/:id').delete(deleteProduct)

router.route('/:id').patch(updateProduct)

export default router