//userid, eventid, bookingDate{type: Date, default: Date,now}, bookingDay,  TimeSlot(from-to), status, price, Organiserid
//paymentStatus
const mongoose = require("mongoose");
const { Schema } = mongoose;
const bookingmodel = new Schema({
    name: { type: String }, //user name
    userId: { type: String }, //user who is making the booking
    eventId: { type: String },
    organiseId: { type: String }, //event for which the
    bookingDate: { type: String },
    noofday: { type: Number },
    location: { type: String },
    pin: { type: Number },
    district: { type: String },
    contact: { type: Number },
    email: { type: String },
    panno: { type: String },
    bookingstatus: { type: Boolean },
    capacity: { type: [String] },
    Status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"], //status automatically updated when organizer accept or reject..for now its default
        default: "Pending",
    },
    price: { type: [Number] },
    paymentstatus: {
        type: String,
        enum: ["Pending", "Unpaid", "Paid"],
        default: "Pending",
    },
    eventname: { type: String },
    eventtype: { type: String },
}, {
    timestamps: true,
});

module.exports = mongoose.model("booking", bookingmodel);