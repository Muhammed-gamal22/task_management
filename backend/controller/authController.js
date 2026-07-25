const User = require('../models/User');
const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/AppError")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.userLogin = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        email
    }).select('+password');

    if (!email || !password) {
        return next(new AppError("Please provide email and password", 400));
    }
    if (!user || !(await user.comparePassword(password))) {
        return next(new AppError("Invalid email or password ", 401));
    }
    if (!user) {
        return next(new AppError("Unauthorized", 401));
    }
    const { _id } = user;
    const token = jwt.sign({
        id: _id,
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
    res.status(200).json({
        status: "success",
        token: token,
        user
    });
});

exports.register = catchAsync(async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return next(new AppError("All fields are required", 400))
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        return next(new AppError("User already exists", 400))
    }
    const user = await User.create({ name, email, password });
    res.status(201).json({
        user,
        message: "User registered successfully"
    });
})