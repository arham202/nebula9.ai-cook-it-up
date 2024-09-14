const express = require("express");
const promptController = require("../controllers/promptController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post(
  "/prevPrompts",
  authController.verifyToken,
  promptController.getPrevPrompts
);
router.post(
  "/storePrompt",
  authController.verifyToken,
  promptController.storePrompts
);
router.post(
  "/prompts/:id",
  authController.verifyToken,
  promptController.deletePrompt
);

module.exports = router;
