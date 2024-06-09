const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

// Get all reviews
router.get("/", reviewController.getAllReviews);

// Get all reviews by event id
router.get("/event/:eventId", reviewController.getAllReviewsByEventId);

// Create a review
router.post("/post/:eventId", reviewController.createReview);

// Update a review
router.put("/update/:id", reviewController.updateReview);

// Delete a review
router.delete("/delete/:id", reviewController.deleteReview);

module.exports = router;
