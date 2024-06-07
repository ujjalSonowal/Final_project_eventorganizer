const mongoose = require("mongoose");
const organise = require("../models/organisermodel");

//get all organise
const getallorganise = async (req, res) => {
  const allorganise = await organise.find({}).sort({ createdAt: 1 });
  res.status(200).json(allorganise);
};
//get all organize by top rating
const getbytoprating = async (req, res) => {
  const ratingtop = await organise.find().sort({ rating: 1 }).limit(4);
  res.status(200).json(ratingtop);
};

//get organize by userId
const getorgbyuserid = async (req, res) => {
  try {
    const { id: userId } = req.params;
    // console.log("Received userId:", userId);
    const organisation = await organise.findOne({ userId: userId });
    if (!organisation) {
      return res.status(404).json({ message: "Organisation not found" });
    }
    res.status(202).json(organisation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//create a organise
const createorganise = async (req, res) => {
  const postorganisedata = req.body;
  const userid = req.userid;
  try {
    const postorganise = await organise.create({
      ...postorganisedata,
      userid,
    });
    if (!postorganise) {
      res.status(500).json({ msg: " Server Error" });
    }
    res.status(201).json(postorganise);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get single event
const getsingleorganize = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ error: "Invalid event ID" });
  }

  try {
    const singleorganize = await organise.findById(_id);

    if (!singleorganize) {
      return res.status(404).json({ error: "Organisation not found" });
    }

    res.status(200).json(singleorganize);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update
const updateone = async (req, res) => {
  const updatesdata = req.body;
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ error: "Invalid organisation ID" });
  }

  try {
    const update = await organise.findByIdAndUpdate(
      _id,
      {
        $set: { ...updatesdata },
      },
      {
        new: true,
      }
    );
    if (!update) {
      return res.status(404).json({ error: "Organisation not found" });
    }
    res.status(200).json(update);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteone = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "not vaild id" });
  }
  const deleteorganise = await organise.findOneAndDelete({ _id: id });
  if (!deleteorganise) {
    res.status(404).json({ msg: " not found" });
  }

  res.status(201).json(deleteorganise);
};

module.exports = {
  getallorganise,
  createorganise,
  getbytoprating,
  getsingleorganize,
  updateone,
  deleteone,
  getorgbyuserid,
};
