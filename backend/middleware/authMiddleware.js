const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get Token from header
            // user .split into a array
            token = req.headers.authorization.split(' ')[1]
            // Verify Token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // Get user from token
            // Exclude the password that is found in the data of the token (.select)
            req.user = await User.findById(decoded.id).select('-password')

            if (!req.user) {
                res.status(401)
                throw new Error('Not Authorized')
            }

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not Authorized')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not Authorized')
    }
})

module.exports = { protect }