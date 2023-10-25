const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

// Create a new message/question
router.post("/message", messageController.message_create);

// Read a message by ID
router.get("/message/:id", messageController.message_read);

// Update a message by ID
router.put("/message/:id", messageController.message_update);

// Delete a message by ID
router.delete("/message/:id", messageController.message_delete);

module.exports = router;
