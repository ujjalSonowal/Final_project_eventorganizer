const Review = require("../models/ReviewModel");
const Event = require("../models/eventmodel");

// Function to update the event rating
const updateEventRating = async (eventId) => {
  const reviews = await Review.find({ eventId });
  if (reviews.length === 0) {
    await Event.findByIdAndUpdate(eventId, {
      averageRating: 0,
      numberOfRatings: 0,
    });
  } else {
    const totalRatings = reviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    const averageRating = totalRatings / reviews.length;
    await Event.findByIdAndUpdate(eventId, {
      averageRating: averageRating.toFixed(2),
      numberOfRatings: reviews.length,
    });
  }
};

// Get all reviews
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all reviews by event id
exports.getAllReviewsByEventId = async (req, res) => {
  try {
    const reviews = await Review.find({ eventId: req.params.eventId }).populate(
      "userId",
      "name"
    );
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a review
exports.createReview = async (req, res) => {
  try {
    const { eventId } = req.params;
    const review = new Review({ ...req.body, eventId });
    await review.save();

    // Update the associated event with the new review
    await Event.findByIdAndUpdate(
      eventId,
      { $push: { reviews: review._id } },
      { new: true }
    );

    // Update the event's rating and number of ratings
    await updateEventRating(eventId);

    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a review
exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByIdAndUpdate(id, req.body, { new: true });
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Update the event's rating and number of ratings
    await updateEventRating(review.eventId);

    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Update the event's rating and number of ratings
    await updateEventRating(review.eventId);

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
