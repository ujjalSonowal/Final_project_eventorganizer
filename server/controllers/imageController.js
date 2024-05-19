// imageController.js
const Image = require("../models/eventmodel");

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Please upload an image" });
    }

    const imagePath = req.file.path; // assuming Multer saves the file in the 'public' folder
    const newImage = new Image({ image: imagePath });
    await newImage.save();
    res.json({ imagePath });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
