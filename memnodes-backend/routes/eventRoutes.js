const express = require("express");
const router = express.Router();
const {
  addEvent,
  getEventsByTimeline,
} = require("../controllers/eventsController");

// Add event
router.post("/:timelineId", addEvent);

// Get events for a timeline
router.get("/:timelineId", getEventsByTimeline);

module.exports = router;
