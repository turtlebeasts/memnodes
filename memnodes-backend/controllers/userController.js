const db = require("../db");

exports.updateProfile = async (req, res) => {
  try {
    const { name, bio, password, isPrivate } = req.body;
    const userId = req.user.id;

    // Build dynamic update query
    const fields = [];
    const values = [];

    if (name !== undefined) {
      fields.push("name = ?");
      values.push(name);
    }

    if (bio !== undefined) {
      fields.push("bio = ?");
      values.push(bio);
    }

    if (isPrivate !== undefined) {
      fields.push("is_private = ?");
      values.push(isPrivate ? 1 : 0);
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      fields.push("password = ?");
      values.push(hashedPassword);
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: "No data to update" });
    }

    values.push(userId);
    const query = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;

    await db.query(query, values);

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
