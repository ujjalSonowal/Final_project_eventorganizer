const mongoose = require("mongoose");
const booking = require("../models/bookingmodel");

//get all booking
const getbookingall = async (req, res) => {
  const allbooking = await booking.find({}).sort({ createdAt: 1 });
  res.status(200).json(allbooking);
};

//get single booking by id
const getsinglebooking = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(404).json({ error: " booking not found" });
  }
  const getdata = await booking.findById(_id);
  if (!getdata) {
    res.status(500).json({ error: " data not found" });
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
    res.status(500).json({ error: "booking not found" });
  }
  res.status(201).json(mybooking);
};

//create a booking
// const createbooking = async (req, res) => {
//   const postbookingdata = req.body;
//   const userId = req.userId;
//   const organiseId = req.organiseId;
//   const createbook = await booking.create({
//     ...postbookingdata,
//     userId,
//     organiseId,
//   });

//   if (!createbook) {
//     res.status(500).json({ error: "booking not create" });
//   }
//   res.status(201).json(createbook);
// };

const createbooking = async (req, res) => {
  const postbookingdata = req.body;
  const createbook = await booking.create({ ...postbookingdata });

  if (!createbook) {
    res.status(500).json({ error: "booking not create" });
  }
  res.status(201).json(createbook);
};

//delete a booking
const deletebooking = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(404).json("booking not found");
  }
  const removeData = await booking.findOneAndDelete({
    _id,
    userId: req.userId,
  });
  if (!removeData) {
    return res.status(404).json({ error: "Booking not found" });
  }

  res.status(200).json(removeData);
};
//update booking
const updatebooking = async (req, res) => {
  const { id: _id } = req.params;
  const updates = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(404).json({ error: "booking details not found" });
  }
  const bookingData = await booking.findByIdAndUpdate(_id, {
    $set: { ...updates },
  });
  if (!bookingData) {
    res.status(500).json({ error: "Error updating the booking" });
  }
  res.status(201).json(bookingData);
};

module.exports = {
  getbookingall,
  createbooking,
  getsinglebooking,
  deletebooking,
  updatebooking,
  getmybooking,
};
