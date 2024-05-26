const mongoose = require("mongoose");
const Event = require("../models/eventmodel");
// const uploadMiddleware = require("../middleware/MulterMiddleware");

//get all
const getallevent = async (req, res) => {
  const allevent = await Event.find({}).sort({ createdAt: 1 });
  res.status(200).json(allevent);
};

//get events with limit 6 for home
const getsixevent = async (req, res) => {
  const sixevent = await Event.find({}).sort({ createdAt: 1 }).limit(6);
  res.status(200).json(sixevent);
};

//latest create date
const LatestEvent = async (req, res) => {
  try {
    const latestevent = await Event.find().sort({ createdAt: -1 }).limit(6);
    if (!latestevent) {
      res.status(400).json({ error: "nothing to show" });
    }
    res.status(200).json(latestevent);
  } catch (error) {
    res.status(400).json(error);
  }
};

//get a single event
const singlevent = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(500).json({ error: "event not found" });
  }
  const eventdata = await Event.findOne({ _id });
  if (!eventdata) {
    res.status(404).json({ error: "event not found" });
  }
  res.status(201).json(eventdata);
};

//get event by user id
const geteventuser = async (req, res) => {
  const { userId } = req.params;
  const events = await Event.find(userId);
  if (!events) {
    return res.status(404).json({ message: "Events not found" });
  }
  res.status(202).json(events);
};

//create one
const createevent = async (req, res) => {
  const posteventdata = req.body;
  const userId = req.userId;
  const { organiseId } = req.body;
  try {
    const postevent = await Event.create({
      ...posteventdata,
      userId,
      organiseId,
    });
    if (!postevent) {
      res.status(500).json({ msg: " Server Error" });
    }
    res.status(201).json(postevent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//update one event details
const updateevent = async (req, res) => {
  const updatesdata = req.body;
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(404).json({ error: " not found" });
  }
  const update = await Event.findByIdAndUpdate(_id, {
    $set: { ...updatesdata },
  });
  if (!update) {
    res.status(500).json({ error: " fail to update" });
  }
  res.status(201).json(update);
};

//update total no of comment
const updatnoofcomment = async (_id, noofcomment) => {
  try {
    await Event.findByIdAndUpdate(_id, { $set: { noofcomment: noofcomment } });
  } catch (error) {
    console.log(error);
  }
};

//delete a event
const deletevent = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(404).json({ error: "not a vaild id" });
  }
  const deleteone = await Event.findByIdAndDelete(_id);
  if (!deleteone) {
    res.status(404).json({ error: "not deleted" });
  }
  res.status(200).json(deleteone);
};

//delete a event
// const deletevent = async (req, res) => {
//   const { eventId } = req.params.id;

//   try {
//     if (!mongoose.Types.ObjectId.isValid(eventId)) {
//       return res.status(404).json({ error: "Not a valid ID" });
//     }

//     const deletedEvent = await Event.findByIdAndDelete(eventId);
//     if (!deletedEvent) {
//       return res.status(404).json({ error: "Event not found" });
//     }

//     res
//       .status(200)
//       .json({ message: "Event deleted successfully", deletedEvent });
//   } catch (error) {
//     console.error("Error deleting event:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

//update price
const updateprice = async (req, res) => {
  const { id: _id } = req.params;
  const { index, value } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      res.status(404).json({ error: "not a vaild id" });
    }

    const update = {};
    update[`price.${index}`] = value;

    const data = await Event.findByIdAndUpdate({ _id }, { $set: update });

    if (!data) {
      res.status(400).json({ error: "fail to update" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
//update capacity
const updatecapacity = async (req, res) => {
  const { id: _id } = req.params;
  const { index, value } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      res.status(404).json({ error: "not a vaild id" });
    }

    const update = {};
    update[`capacity.${index}`] = value;

    const data = await Event.findByIdAndUpdate({ _id }, { $set: update });

    if (!data) {
      res.status(400).json({ error: "fail to update" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  getallevent,
  deletevent,
  createevent,
  updateevent,
  singlevent,
  updateprice,
  updatecapacity,
  getsixevent,
  geteventuser,
  LatestEvent,
};
