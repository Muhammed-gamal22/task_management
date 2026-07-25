const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        lowercase: true,
        trim: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Invalid email address"
        ]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false,
        minlength: [6, "Password must be at least 6 characters"],
    },
    confirmPassword: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: "Passwords do not match"
        }
    }
});

UserSchema.pre("save", async function (req, res, next) {
    if (!this.isModified("password")) return next ? next() : undefined;
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    if (next) next();
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
