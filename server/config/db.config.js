module.exports = {
  HOST: "dpg-criofhdumphs73cnqcug-a.oregon-postgres.render.com",
  USER: "cook_it_up_user",
  PASSWORD: "g0JXzzunH8K0ZOUQqtQMZfXIojhEUl4l",
  DB: "cook_it_up",
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  port: 5432,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
