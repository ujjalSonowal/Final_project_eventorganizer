const mongoose = require("mongoose");
const schema = mongoose.Schema;

const imageModel = new schema(
  {
    images: { type: String },
    userId: { type: String },
    eventId: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("image", imageModel);
