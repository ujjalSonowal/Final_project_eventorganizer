const mongoose = require("mongoose");
const schema = mongoose.Schema;

const organisermodel = new schema(
  {
    name: { type: String, require: "please provide name" },
    email: { type: String, require: "Please enter a valid email address" }, //
    owner: { type: String },
    userId: { type: String },
    phone: { type: Number },
    startdate: { type: Date },
    location: { type: String },
    address: { type: String },
    pin: { type: Number },
    postoffice: { type: String },
    state: { type: String },
    services: { type: [String] },
    totalboking: { type: Number, default: 0 },
    status: { type: Boolean, default: true },
    rating: { type: Number, default: 0 },
    feedback: { type: String },
  },
  { timestamps: true }
);

organisermodel.index({ name: "text", location: "text" });

module.exports = mongoose.model("organise", organisermodel);
