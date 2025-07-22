const db = require("../db");

exports.addEvent = async (req, res) => {
  try {
    const { title, description, date, previous_event_id } = req.body;
    const { timelineId } = req.params;

    // Validate input
    if (!title || !date || !timelineId) {
      return res.status(400).json({ success: false, message: "Missing data" });
    }

    // Step 1: Insert new event
    const [result] = await db.execute(
      "INSERT INTO events (timeline_id, title, description, date) VALUES (?, ?, ?, ?)",
      [timelineId, title, description, date]
    );

    const newEventId = result.insertId;

    // Step 2: If this event has a previous one, update it
    if (previous_event_id) {
      await db.execute("UPDATE events SET next_event_id = ? WHERE id = ?", [
        newEventId,
        previous_event_id,
      ]);
    }

    // Step 3: Fetch the newly created event
    const [rows] = await db.execute("SELECT * FROM events WHERE id = ?", [
      newEventId,
    ]);

    res.status(201).json({ success: true, event: rows[0] });
  } catch (err) {
    console.error("Add Event Error:", err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getEventsByTimeline = async (req, res) => {
  try {
    const { timelineId } = req.params;

    const [events] = await db.execute(
      "SELECT * FROM events WHERE timeline_id = ?",
      [timelineId]
    );

    res.json(events);
  } catch (err) {
    console.error("Get Events Error:", err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
