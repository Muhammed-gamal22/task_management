const express = require("express");
const router = express.Router();
const { register, userLogin } = require("../controller/authController");
router.route("/register").post(register);
router.route("/login").post(userLogin);

module.exports = router;