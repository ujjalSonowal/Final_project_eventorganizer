const Image = require("../models/photos"); // Corrected the model import
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

//post image
const uploadFile = async (req, res) => {
  try {
    const newFile = new Image({
      images: req.file.filename,
      userId: req.body.userId, // assuming userId is sent in the request body
      eventId: req.body.eventId, // assuming eventId is sent in the request body
    });
    await newFile.save();

    res
      .status(200)
      .json({ message: "File uploaded successfully", file: req.file });
  } catch (error) {
    res
      .status(500)
      .json({ message: "File upload failed", error: error.message });
  }
};

const getAllImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json(images);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get images", error: error.message });
  }
};

const getImagesByUserId = async (req, res) => {
  try {
    const images = await Image.find({ userId: req.params.userId });
    res.status(200).json(images);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get images", error: error.message });
  }
};

const getImagesByEventIdAndUserId = async (req, res) => {
  try {
    const images = await Image.find({
      userId: req.params.userId,
      eventId: req.params.eventId,
    });
    res.status(200).json(images);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get images", error: error.message });
  }
};

//get image by event Id
const getImageByEventId = async (req, res) => {
  try {
    const images = await Image.find({ eventId: req.params.eventId });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get images by event ID",
      error: error.message,
    });
  }
};

const deleteImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }
    await Image.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete image", error: error.message });
  }
};

module.exports = {
  upload,
  uploadFile,
  getAllImages,
  getImagesByUserId,
  deleteImage,
  getImagesByEventIdAndUserId,
  getImageByEventId,
};
