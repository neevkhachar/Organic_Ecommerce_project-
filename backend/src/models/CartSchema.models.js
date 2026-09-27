import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
        userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
        },
        items: [
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
                        price: {
                                type: Number,
                                required: true,
                                min: 0
                        },
                        quantity: {
                                type: Number,
                                min: 0,
                                default: 1
                        },
                        totalPrice: {
                                type: Number,
                                min: 0
                        },
                },
        ],


}, { timestamps: true })

export const Cart = mongoose.model('Cart', cartSchema)