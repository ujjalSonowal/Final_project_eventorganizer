const express = require("express");
const router = express.Router();
const {
  getNotificationsByEventId,
  getNotificationsByOrganiserId,
  getNotificationsByUserId,
  markNotificationAsRead,
  deleteNotification,
  deleteAllNotificationsForOrganiser,
} = require("../controllers/notificationController");

router.get("/event/:eventId", getNotificationsByEventId);
router.get("/organise/:id", getNotificationsByOrganiserId);
router.get("/user/:userId", getNotificationsByUserId);
router.patch("/read/:id", markNotificationAsRead);
router.delete("/delete/:id", deleteNotification);
router.delete("/deleteAll/:organiseId", deleteAllNotificationsForOrganiser);

module.exports = router;
