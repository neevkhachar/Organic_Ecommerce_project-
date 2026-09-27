import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
        {
                name: {
                        type: String,
                        required: true
                },
                email: {
                        type: String,
                        required: true,
                        unique: true
                },
                password: {
                        type: String,
                        required: true,
                        maxlength: 8
                },
                role: {
                        type: String,
                        enum: ['user', 'admin'],
                        default: 'user'
                },
                address: {

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
                                type: String,
                                required: true,
                                maxlength: 6
                        },
                        phone: {
                                type: String,
                                required: true,
                                maxlength:10,
                                
                        },
                }


        }, { timestamps: true });

export const User = mongoose.model('User', userSchema)

