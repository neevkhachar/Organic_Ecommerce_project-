import { Order } from "../models/OrderSchema.models.js";
import { Cart } from "../models/CartSchema.models.js";
import { User } from "../models/UserSchema.models.js";

const getAllOrder = async (req, res) => {
  try {
    const data = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(400).json({ msg: "Error fetching orders" });
  }
};

const getByIdOrder = async (req, res) => {
  try {
    const data = await Order.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ msg: "Order not found" });
    }
    res.json(data);
  } catch (error) {
    res.status(400).json({ msg: "Error fetching order" });
  }
};

const createOrder = async (req, res) => {
  try {
    // Get user's cart
    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ msg: "Cart is empty. Add items before placing an order." });
    }

    // Get user's address for shipping
    const user = await User.findById(req.user._id);
    if (!user || !user.address) {
      return res.status(400).json({ msg: "User address not found. Please update your profile." });
    }

    // Calculate total
    const totalAmount = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Build order products array
    const products = cart.items.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price
    }));

    const order = await Order.create({
      userId: req.user._id,
      totalAmount: totalAmount,
      status: 'Pending',
      shippingAddress: {
        userId: req.user._id,
        city: user.address.city,
        street: user.address.street,
        state: user.address.state,
        country: user.address.country,
        pincode: user.address.pincode,
        phone: user.address.phone
      },
      products: products,
      paymentMathod: req.body.paymentMethod || 'COD'
    });

    // Clear the cart after order is placed
    cart.items = [];
    await cart.save();

    res.status(201).json({ msg: "Order placed successfully!", order });
  } catch (error) {
    console.log("Create order error:", error);
    res.status(400).json({ msg: "Error creating order", error: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const data = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(data);
  } catch (error) {
    res.status(400).json({ msg: "Error updating order" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ msg: "Order deleted" });
  } catch (error) {
    res.status(400).json({ msg: "Error deleting order" });
  }
};

export { getAllOrder, getByIdOrder, updateOrder, deleteOrder, createOrder };