import { Product } from "../models/productSchema.models.js"

const getAll = async (req, res) => {
	try {
		const filter = {};

		// Support query parameter filtering
		if (req.query.isFeatured === 'true') filter.isFeatured = true;
		if (req.query.isBestSeller === 'true') filter.isBestSeller = true;
		if (req.query.isJustArrived === 'true') filter.isJustArrived = true;
		if (req.query.category) filter.category = req.query.category;
		if (req.query.hasDiscount === 'true') filter.discountPercentage = { $gt: 0 };

		const data = await Product.find(filter);
		res.json(data);
	} catch (error) {
		res.status(400).json({ msg: "Error fetching products" });
	}
}

const getById = async (req, res) => {
	try {
		const data = await Product.findById(req.params.id);
		if (!data) {
			return res.status(404).json({ msg: "Product not found" });
		}
		res.json(data);
	} catch (error) {
		res.status(400).json({ msg: "Error fetching product" });
	}
}

const createProduct = async (req, res) => {
	try {
		const data = await Product.create(req.body);
		res.status(201).json(data);
	} catch (error) {
		res.status(400).json({ msg: "Error creating product", error: error.message });
	}
}

const updateProduct = async (req, res) => {
	try {
		const data = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
		res.json(data);
	} catch (error) {
		res.status(400).json({ msg: "Error updating product" });
	}
}

const deleteProduct = async (req, res) => {
	try {
		const data = await Product.findByIdAndDelete(req.params.id);
		res.json({ msg: "Product deleted successfully" });
	} catch (error) {
		res.status(400).json({ msg: "Error deleting product" });
	}
}

export { getAll, getById, createProduct, updateProduct, deleteProduct }