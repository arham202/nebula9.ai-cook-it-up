const pool = require("../db");

exports.getUserInfo = async (req, res) => {
  const { userName } = req.body;
  console.log("userName", userName);

  if (!userName) {
    return res.status(400).json({ error: "Missing userName" });
  }

  try {
    const result = await pool.query(
      "SELECT country,fav_cuisine,dietary FROM user_preferences WHERE username = $1",
      [userName]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "User Not Found" });
  }
};

exports.createInfo = async (req, res) => {
  const { userName, country, favCuisine, dietary } = req.body;

  if (!userName || !country || !favCuisine || !dietary) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO user_preferences (username, country, fav_cuisine, dietary)
           VALUES ($1, $2, $3, $4)
           ON CONFLICT (username)
           DO UPDATE SET country = EXCLUDED.country,
                         fav_cuisine = EXCLUDED.fav_cuisine,
                         dietary = EXCLUDED.dietary
           RETURNING *`,
      [userName, country, favCuisine, dietary]
    );

    res
      .status(201)
      .json({ status: "Created/Updated Successfully", user: result.rows[0] });
  } catch (error) {
    console.error("Error inserting/updating user:", error);
    res
      .status(500)
      .json({ error: `Error inserting/updating user: ${error.message}` });
  }
};
