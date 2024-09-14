const express = require("express");
const verifySignUp = require("../utils/verifySignUp");
const authController = require("../controllers/authController");

const router = express.Router();

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post(
  "/signup",
  verifySignUp.checkDuplicateUsernameOrEmail,
  authController.signup
);

router.post("/signin", authController.signin);

router.get("/api/protected", authController.verifyToken, (req, res) => {
  res.status(200).send({
    message: "This is a protected route!",
  });
});

module.exports = router;
