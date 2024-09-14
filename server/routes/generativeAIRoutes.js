const express = require("express");
const generativeAIController = require("../controllers/generativeAIController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post(
  "/generate",
  authController.verifyToken,
  generativeAIController.getPrevPromptsgenerateResponse
);

module.exports = router;
