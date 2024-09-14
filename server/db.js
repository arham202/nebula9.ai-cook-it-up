const { Pool } = require("pg");

const pool = new Pool({
  user: "cook_it_up_user",
  host: "dpg-criofhdumphs73cnqcug-a.oregon-postgres.render.com",
  database: "cook_it_up",
  password: "g0JXzzunH8K0ZOUQqtQMZfXIojhEUl4l",
  port: 5432,
  ssl: {
    rejectUnauthorized: false, // This option is useful if you don’t have a valid SSL certificate, but for production, you should set this to `true` and provide proper certificates.
  },
});

module.exports = pool;
