const Task = require('../models/Task');
const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/AppError")
const jwt = require("jsonwebtoken");

exports.createTask = catchAsync(async (req, res, next) => {
    const { title, description, status, priority, due_date } = req.body;
    const task = await Task.create({
        title,
        description,
        status,
        priority,
        due_date,
        user: req.user._id
    });
    res.status(201).json({
        task,
        message: "Task created successfully"
    });
})


exports.getAllTasks = catchAsync(async (req, res, next) => {
    const tasks = await Task.find({
        user: req.user._id
    }).sort({ createdAt: -1 });
    res.status(200).json({
        tasks,
        message: "Tasks fetched successfully"
    });
});

exports.updateTask = catchAsync(async (req, res, next) => {
    const task = await Task.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        req.body,
        { new: true, runValidators: true }
    );
    if (!task) {
        return next(new AppError("No task found with that ID for this user", 404));
    }
    res.status(200).json({
        task,
        message: "Task updated successfully"
    });
});

exports.deleteTask = catchAsync(async (req, res, next) => {
    const task = await Task.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id
    });
    if (!task) {
        return next(new AppError("No task found with that ID for this user", 404));
    }
    res.status(200).json({
        message: "Task deleted successfully"
    });
});

