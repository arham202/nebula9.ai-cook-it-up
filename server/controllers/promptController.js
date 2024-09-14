const pool = require("../db");

exports.getPrevPrompts = async (req, res, next) => {
  const { userName } = req.body;
  console.log(userName);
  try {
    const result = await pool.query(
      "SELECT id, prompt_text FROM prompts WHERE userName = $1 ORDER BY id DESC LIMIT 10",
      [userName]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch prompts" });
  }
  next();
};

exports.storePrompts = async (req, res, next) => {
  const { userName, promptText } = req.body;

  if (!userName || !promptText) {
    return res.status(400).json({ error: "Missing userName or promptText" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO prompts (username, prompt_text) VALUES ($1, $2) RETURNING *",
      [userName, promptText]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to store prompt" });
  }
};

exports.deletePrompt = async (req, res, next) => {
  const { id } = req.params;
  const { userName } = req.body;

  if (!userName || !id) {
    return res.status(400).json({ error: "Missing userName or id" });
  }

  try {
    const result = await pool.query(
      "DELETE FROM prompts WHERE id = $1 AND userName = $2 RETURNING *",
      [id, userName]
    );

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ error: "No prompt found for the given id and userName" });
    }

    res.status(200).json({ message: "Prompt deleted successfully" });
  } catch (error) {
    console.error("Failed to delete prompt:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the prompt" });
  }
};
