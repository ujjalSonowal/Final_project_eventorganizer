const mongoose = require("mongoose");
const booking = require("../models/bookingmodel");
const Notification = require("../models/notification");

//get all booking
const getbookingall = async (req, res) => {
  const allbooking = await booking.find({}).sort({ createdAt: 1 });
  res.status(200).json(allbooking);
};

//get single booking by id
const getsinglebooking = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({ error: " booking not found" });
  }
  const getdata = await booking.findById(_id);
  if (!getdata) {
    return res.status(500).json({ error: " data not found" });
  }
  res.status(200).json(getdata);
};

//get booking by user id
// const getbookinguser = async (req, res) => {
//   const { userId } = req.params;
//   const bookings = await booking.findOne(userId);
//   if (!bookings) {
//     return res.status(404).json({ message: "Events not found" });
//   }
//   res.status(202).json(bookings);
// };

//get booking by userId
const getmybooking = async (req, res) => {
  const { id: userId } = req.params;
  const mybooking = await booking.find({ userId });
  if (!mybooking) {
    return res.status(500).json({ error: "booking not found" });
  }
  res.status(201).json(mybooking);
};

const getallbooking = async (req, res) => {
  const { id: organiseId } = req.params;
  // const allbooking = await booking.find({ organiseId: organiseId });
  // if (!allbooking) {
  //  return res.status(500).json({ error: "booking not found" });
  // }
  // res.status(201).json(allbooking);
  // const { id: organiseId } = req.params;

  try {
    const allbooking = await booking.find({ organiseId: organiseId });

    if (!allbooking || allbooking.length === 0) {
      return res.status(404).json({ error: "Bookings not found" });
    }

    res.status(200).json(allbooking);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching bookings" });
  }
};

//create booking
// const createbooking = async (req, res) => {
//   const postbookingdata = req.body;
//   const createbook = await booking.create({ ...postbookingdata });

//   if (!createbook) {
//     return res.status(500).json({ error: "booking not create" });
//   }
//   res.status(201).json(createbook);
// };

// Create a booking
const createbooking = async (req, res) => {
  const postbookingdata = req.body;
  try {
    const createbook = await booking.create({ ...postbookingdata });

    if (!createbook) {
      return res.status(500).json({ error: "Booking not created" });
    }

    const message = `New booking created for event ${createbook.eventname}`;
    await Notification.create({
      eventId: createbook.eventId,
      organiseId: createbook.organiseId,
      userId: createbook.userId,
      message,
    });

    res.status(201).json(createbook);
  } catch (error) {
    return res.status(500).json({ error: "Booking not created" });
  }
};

//delete a booking
// const deletebooking = async (req, res) => {
//   const { id: _id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(_id)) {
//     return res.status(404).json("Booking not found");
//   }

//   const removedBooking = await booking.findByIdAndDelete(_id);
//   if (!removedBooking) {
//     return res.status(404).json({ error: "Booking not found" });
//   }

//   const message = `Booking for event ${removedBooking.eventname} has been canceled by the customer.`;
//   await Notification.create({
//     eventId: removedBooking.eventId,
//     organiseId: removedBooking.organiseId,
//     userId: removedBooking.userId,
//     message,
//   });

//   res.status(200).json(removedBooking);
// };

//delete a booking
const deletebooking = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(404).json("booking not found");
  }
  const removeData = await booking.findOneAndDelete({
    _id,
    // userId: req.userId,
  });
  if (!removeData) {
    return res.status(404).json({ error: "Booking not found" });
  }

  const message = `Booking for event ${removeData.eventname} has been canceled by the customer.`;
  await Notification.create({
    eventId: removeData.eventId,
    organiseId: removeData.organiseId,
    userId: removeData.userId,
    message,
  });

  res.status(200).json(removeData);
};

//update booking
const updatebooking = async (req, res) => {
  const { id: _id } = req.params;
  const updates = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({ error: "booking details not found" });
  }
  const bookingData = await booking.findByIdAndUpdate(_id, {
    $set: { ...updates },
  });
  if (!bookingData) {
    return res.status(500).json({ error: "Error updating the booking" });
  }
  res.status(201).json(bookingData);
};

//recent booking for organiser
const recentbooking = async (req, res) => {
  const { id: eventId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    return res.status(404).json({ error: "Booking details not found" });
  }

  try {
    const bookingData = await booking.find({ eventId }).sort({ createdAt: -1 });
    if (!bookingData) {
      return res.status(404).json({ error: "Booking not found" });
    }
    return res.status(200).json(bookingData); // Changed to 200 OK as this is a successful data retrieval
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
const getBookingsForEvent = async (req, res) => {
  const { eventId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    return res.status(404).json({ error: "Invalid event ID" });
  }

  try {
    const bookingData = await booking.find({ eventId }).sort({ createdAt: -1 });
    if (!bookingData) {
      return res
        .status(404)
        .json({ error: "Booking not found for this event and user" });
    }
    res.status(200).json(bookingData);
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller to check if a booking already exists
const checkBookingExists = async (req, res) => {
  const eventId = req.params.eventId;
  const userId = req.params.userId;

  try {
    const existingBooking = await booking.findOne({ eventId, userId });
    const isBooked = existingBooking !== null;
    res.json({ isBooked });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = {
  getbookingall,
  createbooking,
  getsinglebooking,
  deletebooking,
  updatebooking,
  getmybooking,
  getallbooking,
  recentbooking,
  getBookingsForEvent,
  checkBookingExists,
};
