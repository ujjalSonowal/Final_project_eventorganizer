const mongoose = require("mongoose");
const Notification = require("../models/notification");

// Get notifications by event ID
const getNotificationsByEventId = async (req, res) => {
  const { eventId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    return res.status(404).json({ error: "Invalid event ID" });
  }

  try {
    const notifications = await Notification.find({ eventId });
    if (!notifications || notifications.length === 0) {
      return res
        .status(404)
        .json({ error: "No notifications found for this event" });
    }
    res.status(200).json(notifications);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching notifications" });
  }
};

// Get notifications by organizer ID
// const getNotificationsByOrganiserId = async (req, res) => {
//   const { organiseId } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(organiseId)) {
//     return res.status(404).json({ error: "Invalid organizer ID" });
//   }

//   try {
//     const notifications = await Notification.find({ organiseId });
//     if (!notifications || notifications.length === 0) {
//       return res
//         .status(404)
//         .json({ error: "No notifications found for this organizer" });
//     }
//     res.status(200).json(notifications);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "An error occurred while fetching notifications" });
//   }
// };

// Get notifications by user ID
const getNotificationsByUserId = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({ error: "Invalid user ID" });
  }

  try {
    const notifications = await Notification.find({ userId });
    if (!notifications || notifications.length === 0) {
      return res
        .status(404)
        .json({ error: "No notifications found for this user" });
    }
    res.status(200).json(notifications);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching notifications" });
  }
};

// Mark notification as read
const markNotificationAsRead = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid notification ID" });
  }

  try {
    const notification = await Notification.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    res.status(200).json(notification);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the notification" });
  }
};

// Delete a notification
const deleteNotification = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid notification ID" });
  }

  try {
    const notification = await Notification.findByIdAndDelete(id);

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the notification" });
  }
};

// Create a notification when a booking is completed
// const createNotificationOnBooking = async (booking) => {
//   try {
//     const message = `New booking created for event ${booking.eventId}`;
//     const notification = new Notification({
//       message,
//       organiseId: booking.organiseId,
//       eventId: booking.eventId,
//       userId: booking.userId,
//     });

//     await notification.save();
//   } catch (error) {
//     console.error("Error creating notification:", error);
//   }
// };

const getNotificationsByOrganiserId = async (req, res) => {
  const { id: organiseId } = req.params; // Assuming organiserId is passed as userId in params

  try {
    const notifications = await Notification.find({ organiseId: organiseId });

    if (!notifications || notifications.length === 0) {
      return res
        .status(404)
        .json({ error: "No notifications found for this organizer" });
    }

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching notifications" });
  }
};

module.exports = {
  getNotificationsByEventId,
  getNotificationsByOrganiserId,
  getNotificationsByUserId,
  markNotificationAsRead,
  deleteNotification,
  //   createNotificationOnBooking,
};
