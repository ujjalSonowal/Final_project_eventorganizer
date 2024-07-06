const mongoose = require("mongoose");
const schema = mongoose.Schema;

const eventmodel = new schema(
  {
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "user",
    // },
    // organiseId: { type: mongoose.Schema.Types.ObjectId, ref: "organise" },
    reviews: [{ type: schema.Types.ObjectId, ref: "Review" }],
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
    // status: { type: String, enum: ["Active", "Inactive"] },
    status: { type: Boolean, default: true },
    createOn: { type: Date, default: Date.now },
    totalbooking: { type: Number, default: 0 },
    noofcomment: { type: Number, default: 0 },
    // comment: [
    //   {
    //     commentBody: String,
    //     // rating: Number,
    //     commentDate: { type: Date, default: Date.now() },
    //     userId: String,
    //   },
    // ],
    eventdesc: { type: String }, //description

    averageRating: { type: Number, default: 0 },
    numberOfRatings: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("events", eventmodel);
