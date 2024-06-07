const mongoose = require("mongoose");
const schema = mongoose.Schema;

const eventmodel = new schema(
  {
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "user",
    // },
    // organiseId: { type: mongoose.Schema.Types.ObjectId, ref: "organise" },
    userId: { type: String },
    organiseId: { type: String },
    name: { type: String, require: "Please provide an Event Name" },
    type: { type: String },
    capacity: { type: [Number] },
    price: { type: [Number] },
    // reviews: [reviewSchema],
    rating: { type: Number, default: 0 },
    // numofReviews: {
    //   type: Number,
    //   default: 0,
    // },
    images: { type: [String] },
    video: { type: String },
    status: { type: String, enum: ["Active", "Inactive"] }, // active or inactive
    createOn: { type: Date, default: Date.now },
    totalbooking: { type: Number, default: 0 },
    noofcomment: { type: Number, default: 0 },
    comment: [
      {
        commentBody: String,
        // rating: Number,
        commentDate: { type: Date, default: Date.now() },
        userId: String,
      },
    ],
    eventdesc: { type: String }, //description
  },
  { timestamps: true }
);

module.exports = mongoose.model("events", eventmodel);
