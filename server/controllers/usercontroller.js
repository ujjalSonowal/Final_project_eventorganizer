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
    res.status(404).json({ error: "not vaild id" });
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
    res.status(404).json({ error: "not vaild id" });
  }
  const deleteuser = await user.findOneAndDelete({ _id: id });
  if (!deleteuser) {
    res.status(404).json({ msg: " not found" });
  }

  res.status(201).json(deleteuser);
};

module.exports = {
  alluser,
  getsingleuser,
  updateuser,
  deleteuser,
};
