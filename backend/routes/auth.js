const express = require("express");
require('dotenv').config();
const User = require("../models/User");
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const JWT_SECRET = `srmnikku`;
const fetchuser = require("../middleware/fetchuser");

// ROUTE 1: Create a User using: POST "/api/auth/"
router.post("/register", [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("password", "Password must have min 8 characters.").isLength({ min: 8 }),
    body("email", "Enter a valid email address").isEmail(),
    body("mobile", "Enter a valid mobile number").isMobilePhone().isLength({ min: 10, max: 10 }),
], async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    // Check if email or mobile no. exists already
    try {
        let user = await User.findOne({ $or: [{ email: req.body.email }, { mobile: req.body.mobile }] });
        if (user) {
            success = false;
            return res.status(400).json({success, error: "Sorry an user with this email or mobile no. already exists."});
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        // Creating a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            password: secPass,
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authToken });
    } catch (error) {
        console.error("Internal error occurring while creating user.", error);
        res.status(500).send("Internal server error occurring while creating user.");
    }
})
// ROUTE 2: Authenticate a user using: POST "/api/auth/login". No Login required
router.post("/login", [
    body("email", "Enter a valid email address").isEmail(),
    body("password", "Password cannot be blank").exists()
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false
            return res.status(400).json({success, error: "Please try to login with correct credentials." });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({success, error: "Please try to login with correct credentials." });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });
    } catch (error) {
        console.error("Error while authenticating user.", error);
        res.status(500).send("Internal server Error.");
    }
})

// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required.
router.get("/user", fetchuser, async (req, res) => {
    let success = false;
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        // Return an error if user is deleted later after creation
        if (!user){
            return res.status(404).json({success, error: "User not found."})
        }
        success = true;
        res.json({success, user});
    } catch (error) {
        console.error("Error while fetching user details.", error);
        res.status(500).send("Internal server Error.");
    }
})
module.exports = router;
