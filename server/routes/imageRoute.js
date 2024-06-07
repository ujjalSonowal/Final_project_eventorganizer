// imageRoute.js
const express = require("express");
const router = express.Router();

const imageController = require("../controllers/imageController");

router.post(
  "/post",
  imageController.upload.single("images"),
  imageController.uploadFile
);

router.get("/images", imageController.getAllImages);
router.get("/images/user/:userId", imageController.getImagesByUserId);
router.delete("/delete/:id", imageController.deleteImage);

router.get(
  "/images/user/:userId/event/:eventId",
  imageController.getImagesByEventIdAndUserId
);

router.get("/images/event/:eventId", imageController.getImageByEventId);

module.exports = router;
