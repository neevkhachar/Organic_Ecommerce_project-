import mongoose from "mongoose";



const productSchema = new mongoose.Schema(
        {
                price: {
                        type: Number,
                        required: true,
                        min: 0
                },
                description: {
                        type: String,
                        required: true,
                        maxlength: 150
                },
                name: {
                        type: String,
                        required: true
                },
                brand: {
                        type: String,
                        required: true
                },
                category: {
                        type: String
                },
                stock: {
                        type: Number,
                        default: 0,
                        min: 0
                },
                image: {
                        type: String,
                        required: true,
                },
                isFeatured: {
                        type: Boolean,
                        default: false
                },
                isBestSeller: {
                        type: Boolean,
                        default: false
                },
                isJustArrived: {
                        type: Boolean,
                        default: false
                },
                discountPercentage: {
                        type: Number,
                        default: 0,
                        min: 0,
                        max: 100
                },
                salesCount: {
                        type: Number,
                        default: 0
                },
                rating: [
                        {
                                userId: {
                                        type: mongoose.Schema.Types.ObjectId,
                                        ref: 'User'
                                },
                                rate: {
                                        type: Number,
                                        min: 0,
                                        max: 5,
                                        default: 0
                                }
                        }
                ]
        }, { timestamps: true })

export const Product = mongoose.model('Product', productSchema)

