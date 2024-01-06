// jwtMiddleware.js
require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const jwtMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        console.log('no token provided')
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        try {
            const user = await User.findById(decodedToken.userId);

            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }
            req.user = user;
            next();
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    });
};

module.exports = jwtMiddleware;
