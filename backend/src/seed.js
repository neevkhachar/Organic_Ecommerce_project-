import mongoose from "mongoose";
import dotenv from "dotenv";
import { Product } from "./models/productSchema.models.js";
import connectDB from "./db/connection.js";

dotenv.config({ path: "./.env" });

const sampleProducts = [
  // 🍎 FEATURED PRODUCTS (6)
  {
    name: "Organic Honey", brand: "Nature's Best", price: 15.99,
    description: "Pure, raw, and unfiltered organic honey from local farms.",
    category: "Groceries", stock: 50,
    image: "https://images.unsplash.com/photo-1587049352847-4d4b126a71bb?q=80&w=600&auto=format&fit=crop",
    isFeatured: true, isBestSeller: true, isJustArrived: false, discountPercentage: 0, salesCount: 150
  },
  {
    name: "Fresh Avocados", brand: "GreenFarm", price: 5.99,
    description: "Pack of 4 ripe and ready to eat organic Hass avocados.",
    category: "Fruits and vegetables", stock: 100,
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=600&auto=format&fit=crop",
    isFeatured: true, isBestSeller: true, isJustArrived: false, discountPercentage: 0, salesCount: 300
  },
  {
    name: "Organic Matcha Tea", brand: "ZenBrew", price: 24.99,
    description: "Ceremonial grade organic matcha green tea powder.",
    category: "Drinks", stock: 40,
    image: "https://images.unsplash.com/photo-1582793988951-9aed5509eb97?q=80&w=600&auto=format&fit=crop",
    isFeatured: true, isBestSeller: false, isJustArrived: false, discountPercentage: 10, salesCount: 80
  },
  {
    name: "Grass-Fed Butter", brand: "DairyFree", price: 4.49,
    description: "Rich, creamy butter from grass-fed cows.",
    category: "Dairy and Eggs", stock: 30,
    image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=600&auto=format&fit=crop",
    isFeatured: true, isBestSeller: false, isJustArrived: true, discountPercentage: 0, salesCount: 20
  },
  {
    name: "Wild Salmon Fillets", brand: "OceanFresh", price: 18.99,
    description: "Freshly caught wild Alaskan salmon fillets.",
    category: "Seafood", stock: 25,
    image: "https://images.unsplash.com/photo-1599084942896-673ec90d0a2a?q=80&w=600&auto=format&fit=crop",
    isFeatured: true, isBestSeller: false, isJustArrived: false, discountPercentage: 0, salesCount: 50
  },
  {
    name: "Artisan Sourdough", brand: "Bakery Delight", price: 6.99,
    description: "Freshly baked artisan sourdough bread loaf.",
    category: "Bakery and Bread", stock: 15,
    image: "https://images.unsplash.com/photo-1589367920969-ab8e050eb0e9?q=80&w=600&auto=format&fit=crop",
    isFeatured: true, isBestSeller: true, isJustArrived: false, discountPercentage: 0, salesCount: 200
  },

  // 📈 BEST SELLERS (Additional 4 to make total 6)
  {
    name: "Almond Milk", brand: "DairyFree", price: 4.49,
    description: "Unsweetened organic almond milk. 1 Liter.",
    category: "Dairy and Eggs", stock: 80,
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=600&auto=format&fit=crop",
    isFeatured: false, isBestSeller: true, isJustArrived: false, discountPercentage: 0, salesCount: 400
  },
  {
    name: "Organic Bananas", brand: "GreenFarm", price: 2.99,
    description: "Bunch of 6 organic fair-trade bananas.",
    category: "Fruits and vegetables", stock: 150,
    image: "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?q=80&w=600&auto=format&fit=crop",
    isFeatured: false, isBestSeller: true, isJustArrived: false, discountPercentage: 0, salesCount: 500
  },
  {
    name: "Free Range Eggs", brand: "HappyHens", price: 6.49,
    description: "Dozen large brown eggs from pasture-raised hens.",
    category: "Dairy and Eggs", stock: 45,
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?q=80&w=600&auto=format&fit=crop",
    isFeatured: false, isBestSeller: true, isJustArrived: false, discountPercentage: 0, salesCount: 350
  },
  {
    name: "Dark Chocolate 70%", brand: "Cocoa Bliss", price: 4.99,
    description: "70% Cocoa organic dark chocolate bar.",
    category: "Chocolates", stock: 80,
    image: "https://images.unsplash.com/photo-1614088685112-0a760b71a3c8?q=80&w=600&auto=format&fit=crop",
    isFeatured: false, isBestSeller: true, isJustArrived: false, discountPercentage: 0, salesCount: 280
  },

  // 🏷️ DISCOUNTED PRODUCTS (5)
  {
    name: "Organic Coffee Beans", brand: "ZenBrew", price: 14.99,
    description: "Whole bean organic arabica coffee.",
    category: "Drinks", stock: 60,
    image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=600&auto=format&fit=crop",
    isFeatured: false, isBestSeller: false, isJustArrived: false, discountPercentage: 20, salesCount: 90
  },
  {
    name: "Extra Virgin Olive Oil", brand: "Nature's Best", price: 22.99,
    description: "Cold-pressed organic extra virgin olive oil.",
    category: "Groceries", stock: 35,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=600&auto=format&fit=crop",
    isFeatured: false, isBestSeller: false, isJustArrived: false, discountPercentage: 15, salesCount: 40
  },
  {
    name: "Mixed Nuts", brand: "SnackTime", price: 12.99,
    description: "Roasted and lightly salted organic mixed nuts.",
    category: "Snacks and Chips", stock: 50,
    image: "https://images.unsplash.com/photo-1599598425947-33002629ee98?q=80&w=600&auto=format&fit=crop",
    isFeatured: false, isBestSeller: false, isJustArrived: false, discountPercentage: 25, salesCount: 110
  },
  {
    name: "Organic Maple Syrup", brand: "Nature's Best", price: 16.99,
    description: "Grade A dark amber organic maple syrup.",
    category: "Groceries", stock: 25,
    image: "https://images.unsplash.com/photo-1589149630734-706536340237?q=80&w=600&auto=format&fit=crop",
    isFeatured: false, isBestSeller: false, isJustArrived: false, discountPercentage: 10, salesCount: 60
  },
  {
    name: "Granola Cereal", brand: "Breakfast Delight", price: 7.99,
    description: "Crunchy oat granola with almonds and honey.",
    category: "Breakfast Foods", stock: 40,
    image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?q=80&w=600&auto=format&fit=crop",
    isFeatured: false, isBestSeller: false, isJustArrived: false, discountPercentage: 30, salesCount: 85
  },

  // ✨ JUST ARRIVED (5)
  {
    name: "Organic Quinoa", brand: "Nature's Best", price: 8.99,
    description: "Premium white organic quinoa grains.",
    category: "Pasta and Rice", stock: 100,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=600&auto=format&fit=crop",
    isFeatured: false, isBestSeller: false, isJustArrived: true, discountPercentage: 0, salesCount: 5
  },
  {
    name: "Fresh Strawberries", brand: "GreenFarm", price: 4.99,
    description: "Sweet and juicy organic strawberries.",
    category: "Fruits and vegetables", stock: 30,
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=600&auto=format&fit=crop",
    isFeatured: false, isBestSeller: false, isJustArrived: true, discountPercentage: 0, salesCount: 12
  },
  {
    name: "Oat Milk", brand: "DairyFree", price: 5.49,
    description: "Creamy barista-blend organic oat milk.",
    category: "Dairy and Eggs", stock: 60,
    image: "https://images.unsplash.com/photo-1600788886242-5c96aabe3757?q=80&w=600&auto=format&fit=crop",
    isFeatured: false, isBestSeller: false, isJustArrived: true, discountPercentage: 0, salesCount: 8
  },
  {
    name: "Himalayan Pink Salt", brand: "SpiceWorld", price: 6.99,
    description: "Coarse ground pure Himalayan pink salt.",
    category: "Spices and Seasonings", stock: 45,
    image: "https://images.unsplash.com/photo-1621245059632-41fbd6d0c156?q=80&w=600&auto=format&fit=crop",
    isFeatured: false, isBestSeller: false, isJustArrived: true, discountPercentage: 0, salesCount: 3
  },
  {
    name: "Baby Spinach", brand: "FreshLeaf", price: 3.49,
    description: "Pre-washed organic baby spinach leaves.",
    category: "Fruits and vegetables", stock: 50,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=600&auto=format&fit=crop",
    isFeatured: false, isBestSeller: false, isJustArrived: true, discountPercentage: 0, salesCount: 15
  }
];

const seedProducts = async () => {
  try {
    await connectDB();
    console.log("Connected to database. Seeding 20 new diverse products...");

    // Clear existing products
    await Product.deleteMany();
    console.log("Cleared existing products.");

    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`${createdProducts.length} products added successfully!`);
    
    process.exit(0);
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
};

seedProducts();
