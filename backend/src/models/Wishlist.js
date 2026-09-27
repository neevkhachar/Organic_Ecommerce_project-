import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
        userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
        },
        products: [
                {
                        productId: {
                                type: mongoose.Schema.Types.ObjectId,
                                ref: "Product",
                                required: true,
                        },
                        name: {
                                type: String,
                                required: true
                        },
                        description: {
                                type: String,
                                required: true,
                                maxlength:150
                        },
                        brand: {
                                type: String,
                                required:true
                        },
                        price: {
                                type: Number,
                                required: true,
                                min:0
                        }
                }
        ],
}, { timestamps: true })

export const Wishlist = mongoose.model('Wishlist', wishlistSchema)