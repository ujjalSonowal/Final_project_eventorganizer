const mongoose = require("mongoose");
const schema = mongoose.Schema;

const usersmodel = new schema(
  {
    name: { type: String, require: "user must have an name" },
    email: { type: String, require: "user must have an email" },
    usertype: { type: String }, // customer or organizer
    phone: { type: Number },
    password: { type: String },
    // location: {type:String},
    street: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    postoffice: { type: String, required: false },
    pincode: { type: Number, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", usersmodel);
