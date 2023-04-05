const express = require("express");
const router = express.Router();

const authController = require('../controllers/auth_controller');

router.post("/user-register", authController.userRegister);

router.post("/user-login", authController.userLogin);

module.exports = router;