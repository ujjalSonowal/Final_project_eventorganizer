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
  const sixevent = await Event.find({}).sort({ createdAt: 1 }).limit(3);
  res.status(200).json(sixevent);
};

//latest create date
const LatestEvent = async (req, res) => {
  try {
    const latestevent = await Event.find().sort({ createdAt: -1 }).limit(3);
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
    return res.status(404).json({ error: "event not found" });
  }
  res.status(201).json(eventdata);
};

//get event by user id
const geteventuser = async (req, res) => {
  const { id: userId } = req.params;
  const events = await Event.find({ userId: userId });
  if (!events) {
    return res.status(404).json({ message: "Events not found" });
  }
  res.status(202).json(events);
};

//get events by organise id
const geteventbyorgid = async (req, res) => {
  const { id: organiseId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(organiseId)) {
    return res.status(404).json("organise not found");
  }
  const events = await Event.find({ organiseId });
  if (!events) {
    return res.status(404).json({ message: "Events not found" });
  }
  res.status(202).json(events);
};

//create one
const createevent = async (req, res) => {
  const posteventdata = req.body;
  // const images = req.body;
  // const userId = req.userId;
  // const { organiseId } = req.body;
  try {
    const postevent = await Event.create({
      ...posteventdata,
      // images: req.files.map((file) => `/uploads/images/${file.filename}`),
      // userId,
      // organiseId,
    });
    if (!postevent) {
      return res.status(500).json({ msg: " Server Error" });
    }
    res.status(201).json(postevent);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//update one event details
const updateevent = async (req, res) => {
  const updatesdata = req.body;
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(404).json({ error: "Event not found" });
  }
  try {
    const event = await Event.findById(_id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    // Check if any files were uploaded
    if (req.files && req.files.length > 0) {
      // Map uploaded files to their URLs and push them to the existing images array
      updatesdata.images = event.images.concat(
        req.files.map((file) => `/uploads/images/${file.filename}`)
      );
    }
    const update = await Event.findByIdAndUpdate(_id, {
      $set: { ...updatesdata },
    });
    if (!update) {
      return res.status(500).json({ error: "Fail to update" });
    }
    res.status(201).json(update);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
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
    return res.status(404).json({ error: "not a vaild id" });
  }
  const deleteone = await Event.findByIdAndDelete(_id);
  if (!deleteone) {
    return res.status(404).json({ error: "not deleted" });
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

// Get an event with its reviews by ID
const getEventWithReviews = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId).populate("reviews");
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for searching events

// Controller function to fetch events based on filtering criteria
const getFilteredEvents = async (req, res) => {
  const { minPrice, minRating } = req.query;

  try {
    const filter = {};
    if (minPrice) {
      filter.price = { $gte: parseInt(minPrice) }; // Filter events with price greater than or equal to minPrice
    }
    if (minRating) {
      filter.rating = { $gte: parseInt(minRating) }; // Filter events with rating greater than or equal to minRating
    }

    // Query events based on filters
    const events = await Event.find(filter);

    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching filtered events:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const searchEvents = async (req, res) => {
  const { name, location } = req.query;

  try {
    let query = {};

    // If name parameter is present, add it to the query
    if (name) {
      query.name = { $regex: new RegExp(name, "i") }; // Case-insensitive search
    }

    // If location parameter is present, add it to the query
    if (location) {
      query.location = { $regex: new RegExp(location, "i") }; // Case-insensitive search
    }

    const events = await Event.find(query);

    // Check if events array is empty
    if (events.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(events);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
module.exports = {
  searchEvents,
  getFilteredEvents,
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
  geteventbyorgid,
  getEventWithReviews,
};
