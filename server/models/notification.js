// models/notificationModel.js

const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: { type: String }, //customer or  organizer
  organiseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organizer",
  }, //organization id
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "events",
  },

  isRead: { type: Boolean, default: "false" },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
