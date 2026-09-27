import { Cart } from "../models/CartSchema.models.js";
import { Product } from "../models/productSchema.models.js";

// Get the current user's cart
const getMyCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.json({ userId: req.user._id, items: [] });
    }
    res.json(cart);
  } catch (error) {
    res.status(400).json({ msg: "Error fetching cart" });
  }
};

// Add item to cart (or increment quantity if already exists)
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        userId: req.user._id,
        items: [{
          productId: product._id,
          name: product.name,
          description: product.description,
          price: product.price,
          quantity: quantity || 1,
          totalPrice: product.price * (quantity || 1)
        }]
      });
    } else {
      const existingItem = cart.items.find(item => item.productId.toString() === productId);

      if (existingItem) {
        existingItem.quantity += (quantity || 1);
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else {
        cart.items.push({
          productId: product._id,
          name: product.name,
          description: product.description,
          price: product.price,
          quantity: quantity || 1,
          totalPrice: product.price * (quantity || 1)
        });
      }
      await cart.save();
    }

    res.json(cart);
  } catch (error) {
    console.log("Add to cart error:", error);
    res.status(400).json({ msg: "Error adding to cart", error: error.message });
  }
};

// Update quantity of a specific item
const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    if (quantity <= 0) {
      // Remove the item
      cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    } else {
      const item = cart.items.find(item => item.productId.toString() === productId);
      if (item) {
        item.quantity = quantity;
        item.totalPrice = item.price * quantity;
      }
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(400).json({ msg: "Error updating cart" });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(400).json({ msg: "Error removing from cart" });
  }
};

// Clear entire cart
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    res.json({ msg: "Cart cleared" });
  } catch (error) {
    res.status(400).json({ msg: "Error clearing cart" });
  }
};

export { getMyCart, addToCart, updateCartItem, removeFromCart, clearCart };