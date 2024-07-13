const mongoose = require("mongoose");
const user = require("../models/usersmodel");

// get all users

const alluser = async (req, res) => {
  const users = await user.find({});

  res.status(200).json(users);
};
//get a single user by id
const getsingleuser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "not vaild id" });
  }
  const alluser = await user.findById(id);

  if (!alluser) {
    res.status(404).json({ error: "user not found" });
  }

  res.status(201).json(alluser);
};

// update a single user by id
const updateuser = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "not vaild id" });
  }
  const update = await user.findOneAndUpdate(
    { _id: id },
    {
      $set: { ...data },
    }
  );

  if (!update) {
    res.status(404).json({ error: " not updated" });
  }

  res.status(201).json(update);
};

// delete a single user

const deleteuser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "not vaild id" });
  }
  const deleteuser = await user.findOneAndDelete({ _id: id });
  if (!deleteuser) {
    res.status(404).json({ msg: " not found" });
  }

  res.status(201).json(deleteuser);
};

const searchUsers = async (req, res) => {
  const { name } = req.query;

  try {
    let query = {};

    // If name parameter is present, add it to the query
    if (name) {
      query.name = { $regex: new RegExp(name, "i") }; // Case-insensitive search
    }

    const users = await user.find(query);

    // Check if events array is empty
    if (users.length === 0) {
      return res.status(404).json({ error: "user not found" });
    }

    res.json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  searchUsers,
  alluser,
  getsingleuser,
  updateuser,
  deleteuser,
};
