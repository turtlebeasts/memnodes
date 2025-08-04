const db = require("../db");

exports.addEvent = async (req, res) => {
  try {
    const { title, description, date, previous_event_id } = req.body;
    const { timelineId } = req.params;

    if (!title || !date || !timelineId) {
      return res.status(400).json({ success: false, message: "Missing data" });
    }

    let position = 0;
    let next_event_id = null;

    // Step 1: Determine position and next_event_id
    if (previous_event_id) {
      const [prevRows] = await db.execute(
        "SELECT position, next_event_id FROM events WHERE id = ?",
        [previous_event_id]
      );

      if (prevRows.length === 0) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid previous_event_id" });
      }

      const prev = prevRows[0];
      position = prev.position + 1;
      next_event_id = prev.next_event_id;

      // Step 2: Shift positions of all events after this
      await db.execute(
        "UPDATE events SET position = position + 1 WHERE timeline_id = ? AND position >= ?",
        [timelineId, position]
      );
    } else {
      // No previous node — put this at the beginning
      const [maxPosRow] = await db.execute(
        "SELECT MAX(position) AS maxPos FROM events WHERE timeline_id = ?",
        [timelineId]
      );
      position = (maxPosRow[0].maxPos ?? -1) + 1;
    }

    // Step 3: Insert new event
    const [result] = await db.execute(
      "INSERT INTO events (timeline_id, title, description, date, next_event_id, position) VALUES (?, ?, ?, ?, ?, ?)",
      [timelineId, title, description, date, next_event_id, position]
    );

    const newEventId = result.insertId;

    // Step 4: Update previous_event to point to this one
    if (previous_event_id) {
      await db.execute("UPDATE events SET next_event_id = ? WHERE id = ?", [
        newEventId,
        previous_event_id,
      ]);
    }

    // Step 5: Return the newly created event
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

    // Fetch all events ordered by their position value
    const [events] = await db.execute(
      "SELECT * FROM events WHERE timeline_id = ? ORDER BY position ASC",
      [timelineId]
    );

    res.status(200).json(events);
  } catch (err) {
    console.error("Get Events Error:", err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
