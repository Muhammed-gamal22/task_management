const express = require("express");
const router = express.Router();
const { protectUserLogin } = require("../controller/authController");
const { createTask, getAllTasks, updateTask, deleteTask } = require("../controller/taskController");
router.route("/")
    .post(protectUserLogin, createTask)
    .get(protectUserLogin, getAllTasks);

router.route("/:id")
    .patch(protectUserLogin, updateTask)
    .delete(protectUserLogin, deleteTask);
module.exports = router;
