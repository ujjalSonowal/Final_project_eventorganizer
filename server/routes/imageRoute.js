// imageRoute.js
const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../middleware/MulterMiddleware");
const eventmodel = require("../models/eventmodel");

// Handle image uploads
router.post("/upload", uploadMiddleware.single("image"), (req, res) => {
  const images = req.file.filename;
  console.log(images);

  eventmodel
    .create({ images })
    .then((data) => {
      console.log("Image added to database");
      console.log(data);
      res.send(data);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
