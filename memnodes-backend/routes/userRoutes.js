const express = require("express");
const router = express.Router();
const { updateProfile } = require("../controllers/userController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

router.put("/update", authMiddleware, updateProfile);

module.exports = router;
