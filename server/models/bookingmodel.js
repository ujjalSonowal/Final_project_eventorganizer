//userid, eventid, bookingDate{type: Date, default: Date,now}, bookingDay,  TimeSlot(from-to), status, price, Organiserid
//paymentStatus
const mongoose = require("mongoose");
const { Schema } = mongoose;
const bookingmodel = new Schema(
  {
    bookingDate: { type: Date, default: Date.now },
    bookingDay: { type: String },
    totalDays: { type: Number },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    eventId: { type: Schema.Types.ObjectId, ref: "Event" },
    TimeSlot: {
      Start_date: { type: String },
      End_date: { type: String },
    },
    PaymentStatus: {
      type: String,
      enum: ["Unpaid", "Paid"],
      default: "Unpaid",
    },
    capacity: { type: Number }, //user can manually enter capacity[100-150, 200-250...]
    // price: { type: Number }, //price will shows based on the user capacity
    organiseId: { type: Schema.Types.ObjectId, ref: "Organisation" },
    Status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("booking", bookingmodel);
