const mongoose = require("mongoose");

const organisermodel = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: "Company name is required",
    },

    description: { type: String },

    ownerName: {
      type: String,
      required: "owner Name  is required",
    },
    contactEmail: {
      type: String,
      required: "Valid email address is required.",
    },

    contactPhone: {
      type: Number,
      required: "Contact phone number is required.",
    },
    userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    services: [
      {
        serviceName: { type: String },
        description: { type: String },
        // pricing: Number,
      },
    ],

    image: { type: Buffer }, //owner profile logo

    address: { type: String },
    feedback: { type: String }, //feedback on Organizer/company
    rating: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("organise", organisermodel);
