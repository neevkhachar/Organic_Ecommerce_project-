import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
        userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
        },
        totalAmount: {
                type: Number,
                required: true,
                min: 0
        },
        status: {
                type: String,
                enum: ['Pending', "Delivered", "Cancelled"],
                default: 'Pending'
        },
        shippingAddress:
        {
                userId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "User",
                        required: true,
                },
                city: {
                        type: String,
                        required: true,
                },
                street: {
                        type: String,
                        required: true
                },
                state: {
                        type: String,
                        required: true
                },
                country: {
                        type: String,
                        required: true
                },
                pincode: {
                        type: Number,
                        required: true,
                        maxlength: 6
                },
                phone: {
                        type: Number,
                        required: true,
                        maxlength: 10
                },
        },
        products: [{
                productId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Product',
                },
                quantity: {
                        type: Number,
                        required: true,
                        min:0
                },
                price: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'product',
                        min: 0
                }
        }],

        paymentMathod: {
                type: String,
                enum: ['Credit Card','Google-Pay', 'Debit Card', 'Bank Transfer', 'COD', 'UPI','Paytm'],
                required: true,
                default: "COD"
        }
}, { timestamps: true })

export const Order = mongoose.model('Order', OrderSchema)