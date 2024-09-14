const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/user", authController.verifyToken, userController.getUserInfo);
router.post("/set-user", authController.verifyToken, userController.createInfo);

module.exports = router;
