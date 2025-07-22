const db = require("../db");

exports.createTimeline = async (req, res) => {
  const { userId, title, isPublic } = req.body;

  if (!title || userId == null) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    await db.query(
      "INSERT INTO timelines (user_id, title, is_public) VALUES (?, ?, ?)",
      [userId, title, isPublic ? 1 : 0]
    );

    res.status(201).json({ message: "Timeline created" });
  } catch (err) {
    console.error("Create Timeline error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getTimelines = async (req, res) => {
  const userId = req.params.userId;

  try {
    const [rows] = await db.query(
      "SELECT id, title, is_public, created_at FROM timelines WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );

    res.status(200).json(rows);
  } catch (err) {
    console.error("Get timelines error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteTimeline = async (req, res) => {
  const timelineId = req.params.id;

  try {
    if (isNaN(timelineId)) {
      return res.status(400).json({ error: "Invalid timeline ID" });
    }

    const [result] = await db.query("DELETE FROM timelines WHERE id = ?", [
      timelineId,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Timeline not found" });
    }

    res.status(200).json({ message: "Timeline deleted successfully" });
  } catch (err) {
    console.error("Delete timeline error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
