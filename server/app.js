const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const generativeAIRoutes = require("./routes/generativeAIRoutes");
const authRoutes = require("./routes/authRoutes");
const promptRoutes = require("./routes/promptRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();

app.use(cors("*"));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/client/dist")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Cook It Up API." });
});

app.use("/api/auth", authRoutes);
app.use("/api/v1/", promptRoutes);
app.use("/api/v1/", userRoutes);
app.use("/api/generative-ai", generativeAIRoutes);

module.exports = app;
