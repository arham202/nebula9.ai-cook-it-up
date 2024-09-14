const express = require("express");
const cors = require("cors");
const socketIo = require("socket.io");
const http = require("http");
const pool = require("./db");
const app = require("./app");
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

// const db = require("./models");

// db.sequelize.sync({ force: false }).then(() => {
//   console.log("Drop and Resync Db");
// });

const fetchNotifications = async (username) => {
  const result = await pool.query(
    "SELECT * FROM notifications WHERE username = $1 AND is_read = FALSE ORDER BY created_at DESC",
    [username]
  );
  return result.rows;
};

const markAsRead = async (id) => {
  await pool.query("UPDATE notifications SET is_read = true WHERE id = $1", [
    id,
  ]);
};

app.get("/notifications/:username", async (req, res) => {
  const { username } = req.params;
  const notifications = await fetchNotifications(username);
  res.json(notifications);
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
  console.log("a user connected");

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
    console.log("user disconnected");
  });
});

// Server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
