const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    status: {
        type: String,
        enum: ["To Do", "In Progress", "Done"],
        default: "To Do"
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium"
    },
    due_date: {
        type: Date,
        required: [true, "Due date is required"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });
const Task = mongoose.model("Task", TaskSchema)
module.exports = Task;