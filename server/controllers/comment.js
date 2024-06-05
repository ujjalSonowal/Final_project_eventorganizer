const mongoose = require("mongoose");
const event = require("../models/eventmodel");

const postcomment = async (req, res) => {
  const { id: _id } = req.params;
  const { commentBody, rating } = req.body;

  const userId = req.userId;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Event unavailable...");
  }

  try {
    const newComment = { commentBody, rating, userId, commentDate: new Date() };

    const updatedEvent = await event.findByIdAndUpdate(
      _id,
      { $push: { comment: newComment } },
      { new: true }
    );

    res
      .status(201)
      .json({ message: "Comment posted successfully", newComment });
  } catch (error) {
    res.status(400).json("Error in updating");
  }
};

const deleteComment = async (req, res) => {
  const { id: _id } = req.params;
  const { commentId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Event unavailable...");
  }
  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(404).send("Comment unavailable...");
  }

  try {
    await event.updateOne({ _id }, { $pull: { comment: { _id: commentId } } });
    res.status(200).json({ message: "Successfully deleted..." });
  } catch (error) {
    res.status(405).json(error);
  }
};

module.exports = {
  postcomment,
  deleteComment,
};
