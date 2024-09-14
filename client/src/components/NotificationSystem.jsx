import { useState, useEffect, useContext, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { Context } from "../context/Context";
import { Bell, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./NotificationSystem.css";

// DROP TABLE notifications;

// CREATE TABLE notifications (
//   id SERIAL PRIMARY KEY,
//   username VARCHAR NOT NULL,
//   is_read BOOLEAN DEFAULT FALSE,
//   notification_text TEXT NOT NULL,
//   created_at TIMESTAMPTZ DEFAULT NOW()
// );

// Select * from notifications;

const socket = io("http://localhost:8080");

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const { userName } = useContext(Context);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/notifications/${userName}`
        );
        setNotifications(res.data);
        setUnreadCount(res.data.filter((n) => !n.is_read).length);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [userName]);

  useEffect(() => {
    const handleNewNotification = (newNotification) => {
      if (newNotification.username === userName) {
        console.log("hehe");
        console.log(newNotification);
        setNotifications((prev) => [newNotification, ...prev]);
        setUnreadCount((prev) => prev + 1);
      } else {
        console.log("done");
      }
    };

    socket.on("notification", handleNewNotification);

    return () => {
      socket.off("notification", handleNewNotification);
    };
  }, [userName]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMarkAsRead = (id) => {
    socket.emit("mark-as-read", id);
    setSelectedNotification(null);
  };

  useEffect(() => {
    const handleReadSuccess = ({ id }) => {
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, is_read: true } : notif
        )
      );
      setUnreadCount((prev) => prev - 1);
    };

    socket.on("read-success", handleReadSuccess);

    return () => {
      socket.off("read-success", handleReadSuccess);
    };
  }, []);

  return (
    <div className="notification-system">
      <motion.div
        className="notification-icon"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Bell />
        {unreadCount > 0 && (
          <motion.span
            className="unread-count"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {unreadCount}
          </motion.span>
        )}
      </motion.div>
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            ref={dropdownRef}
            className="notification-dropdown"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <h2>Notifications</h2>
            <div className="notification-list">
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  className={`notification-item ${
                    notification.is_read ? "read" : "unread"
                  }`}
                  onClick={() => setSelectedNotification(notification)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <p>{notification.notification_text}</p>
                  <span className="notification-time">
                    {new Date(notification.created_at).toLocaleString()}
                  </span>
                </motion.div>
              ))}
              {notifications.length === 0 && (
                <p className="no-notifications">No notifications yet.</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedNotification && (
          <motion.div
            className="notification-popup"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <div className="popup-content">
              <h3>Notification Details</h3>
              <p>{selectedNotification.notification_text}</p>
              <span className="notification-time">
                {new Date(selectedNotification.created_at).toLocaleString()}
              </span>
              {!selectedNotification.is_read && (
                <motion.button
                  onClick={() => handleMarkAsRead(selectedNotification.id)}
                  className="mark-as-read"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Check /> Mark as Read
                </motion.button>
              )}
              <motion.button
                onClick={() => setSelectedNotification(null)}
                className="close-popup"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X /> Close
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationSystem;
