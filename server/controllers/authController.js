import User from "../models/User.js"
import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'

// Register /api/user/register
export const register = async (req, res) => {
    const { name, email, password } = req.body
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Missing Data" })
        }

        // Check Is User Already Exist
        const existing = await User.findOne({ email })
        if (existing) {
            return res.status(400).json({ success: false, message: "User Already Exists" })
        }

        // Hasing Password
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                token: token
            }
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, error: error.message })
    }
}

// Login /api/user/login
export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Missing email or password" })
        }

        // Check Is User Is Already Exist Or Not
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ success: false, message: "User Does Not Exists" })
        }

        // Compare Password With Hashed Password
        const isPassCorrect = await bcrypt.compare(password, user.password)
        if (!isPassCorrect) {
            return res.status(401).json({ success: false, message: "Invalid Credentials" })
        }

        // Creating Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })

        res.status(200).json({
            success: true,
            message: "User Login Succesfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                token: token
            }
        })
    } catch (error) {
        console.error("Login Error", error)
        res.status(500).json({ success: false, message: error.message })
    }
}

// Get Me User Details /api/user/auth
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password
        if (user) {
            res.status(200).json({
                success: true,
                message: "User data fetched successfully.",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                }
            })
        } else {
            // User not found in DB, even if token was valid (e.g., user deleted)
            res.status(404).json({ success: false, message: "User data not found." });
        }
    } catch (error) {
        console.error("Error fetching user data in getMe:", error);
        res.status(500).json({ success: false, message: "Failed to fetch user data." });
    }
}

// Get All User /api/user/getAll
export const getAllUser = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json({
            success: true,
            message: "users retrieved successfully",
            users,
        })
    } catch (error) {
        console.error("Error getting users:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}