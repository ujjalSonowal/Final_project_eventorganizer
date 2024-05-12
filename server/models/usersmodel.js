const mongoose = require("mongoose");
const schema = mongoose.Schema;

const usersmodel = new schema(
  {
    name: { type: String, require: "user must have an name" },
    email: { type: String, require: "user must have an email" },
    usertype: { type: String },
    phone: { type: Number },
    password: { type: String },
    // location: {type:String},
    address: {
      street: { type: String, required: false },
      city: { type: String, required: false },
      state: { type: String, required: false },
      zipCode: { type: Number, required: false },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", usersmodel);
