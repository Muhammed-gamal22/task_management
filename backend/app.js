const express = require('express');
const AppError = require('./utils/AppError');
const globalAppError = require("./controller/errorController")
const authRouter = require("./routes/authRouter")
const taskRouter = require("./routes/taskRouter")
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use("/auth", authRouter)
app.use("/tasks", taskRouter)
app.use((req, res, next) => {
    next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
})
app.use(globalAppError)
module.exports = app;
