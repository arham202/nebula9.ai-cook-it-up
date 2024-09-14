const pool = require("../db");

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  const { username, email } = req.body;

  try {
    const userByUsername = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (userByUsername.rows.length > 0) {
      return res.status(400).send({
        message: "Failed! Username is already in use!",
      });
    }

    const userByEmail = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userByEmail.rows.length > 0) {
      return res.status(400).send({
        message: "Failed! Email is already in use!",
      });
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;
