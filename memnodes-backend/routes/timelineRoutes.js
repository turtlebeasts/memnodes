const express = require("express");
const router = express.Router();
const {
  createTimeline,
  getPublicTimelines,
} = require("../controllers/timelineController");
const { getTimelines } = require("../controllers/timelineController");
const { deleteTimeline } = require("../controllers/timelineController");

router.post("/create", createTimeline);
router.get("/:userId", getTimelines);
router.delete("/:id", deleteTimeline);
router.get("/", getPublicTimelines);

module.exports = router;
