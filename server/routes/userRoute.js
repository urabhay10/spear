const express = require('express');
const router = express.Router();
require('dotenv').config();
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For creating JSON Web Tokens
const User = require('../models/User');
const jwtMiddleware = require('../middleware/jwtMiddleware');

router.post('/register', async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            fullname: req.body.fullname,
            email: req.body.email,
            password: hashedPassword,
        });
        const savedUser = await newUser.save();
        const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET_KEY);
        res.status(201).json({ token });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Registration failed' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Authentication failed' });
    }
});

router.get('/profile', jwtMiddleware, (req, res) => {
    const userId = req.user._id;

    User.findById(userId)
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Server error' });
        });
});

module.exports = router;