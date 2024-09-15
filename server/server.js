const express = require("express");
const cors = require("cors");
const socketIo = require("socket.io");
const http = require("http");

const dotenv = require("dotenv");
dotenv.config({ path: "./server/config.env" });

const pool = require("./db");
const app = require("./app");
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

const markAsRead = async (id) => {
  await pool.query("UPDATE notifications SET is_read = true WHERE id = $1", [
    id,
  ]);
};

app.post("/notifications/:username", async (req, res) => {
  const { username } = req.params;
  // console.log("hi there");
  try {
    const result = await pool.query(
      "SELECT * FROM notifications WHERE username = $1 AND is_read = FALSE ORDER BY created_at DESC",
      [username]
    );
    // console.log(result);
    res.status(200).json({ data: result.rows });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/send-notification", async (req, res) => {
  const { username, notificationText } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO notifications (username, notification_text) VALUES ($1, $2) RETURNING *",
      [username, notificationText]
    );

    const newNotification = result.rows[0];

    io.emit("notification", newNotification);

    res.status(200).send("Notification sent successfully!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error sending notification");
  }
});

io.on("connection", (socket) => {
  // console.log("a user connected");

  socket.on("new-notification", async (data) => {
    const { username, notificationText } = data;
    await pool.query(
      "INSERT INTO notifications (username, notification_text) VALUES ($1, $2)",
      [username, notificationText]
    );

    io.emit("notification", { username, notificationText });
  });

  socket.on("mark-as-read", async (id) => {
    await markAsRead(id);
    socket.emit("read-success", { id });
  });

  socket.on("disconnect", () => {
    // console.log("user disconnected");
  });
});

// Server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
