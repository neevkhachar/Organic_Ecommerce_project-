import { User } from "../models/UserSchema.models.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const getAll = async (req, res) => {
      try {
            const data = await User.find().select('-password');
            res.json(data)
      } catch (error) {
            res.status(400).json({ msg: "error in getAll user" })
      }
}

const getById = async (req, res) => {
      try {
            const data = await User.findById(req.params.id).select('-password');
            if (!data) {
                  return res.status(404).json({ msg: "User not found" });
            }
            res.json(data)
      } catch (error) {
            res.status(400).json({ msg: "error in getbyid user" })
      }
}

const createUser = async (req, res) => {
      try {
            const userExists = await User.findOne({ email: req.body.email });

            if (userExists) {
                  return res.status(400).json({ msg: "User already exists" });
            }

            // Hash the password before saving
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            const userData = {
                  ...req.body,
                  password: hashedPassword
            };

            const data = await User.create(userData);
            
            // Don't send password back
            const userResponse = data.toObject();
            delete userResponse.password;
            
            res.status(201).json({ msg: "User registered successfully", user: userResponse });
      } catch (error) {
            console.log("Create user error:", error);
            res.status(400).json({ msg: "Error creating user", error: error.message });
      }
}

const updateUser = async (req, res) => {
      try {
            const data = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
            res.json(data)
      } catch (error) {
            res.status(400).json({ msg: "error in update user" })
      }
}

const deleteUser = async (req, res) => {
      try {
            const data = await User.findByIdAndDelete(req.params.id);
            res.json({ msg: "User deleted successfully" })
      } catch (error) {
            res.status(400).json({ msg: "error in delete user" })
      }
}

const loginUser = async (req, res) => {
      try {
            const user = await User.findOne({ email: req.body.email });

            if (!user) {
                  return res.status(400).json({ msg: "Invalid email or password" });
            }

            // Compare password with bcrypt
            const isMatch = await bcrypt.compare(req.body.password, user.password);

            if (!isMatch) {
                  return res.status(400).json({ msg: "Invalid email or password" });
            }

            const payload = {
                  _id: user._id,
                  name: user.name,
                  email: user.email,
                  role: user.role
            };

            const token = jwt.sign(payload, process.env.JWTSECRET, { expiresIn: '7d' });

            res.json({
                  msg: "Login successful",
                  token: token,
                  user: payload
            });
      } catch (error) {
            console.log("Login error:", error);
            res.status(500).json({ msg: "Server error during login" });
      }
}


export { getAll, getById, createUser, updateUser, deleteUser, loginUser }