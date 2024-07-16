const Event = require("../models/eventmodel");
const Organiser = require("../models/organisermodel");

exports.searchController = async (req, res) => {
  const { query } = req.query;
  //   console.log(query);
  try {
    if (!query) {
      return res.status(400).json({ error: "Please enter a search query." });
    }

    // Search in organisers
    const organisers = await Organiser.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });

    // Extract organiser IDs
    const organiserIds = organisers.map((organiser) => organiser._id);

    // Search in events using text search
    const eventTextSearch = await Event.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });

    // Search in events by organiserId
    const eventOrganiserSearch = await Event.find({
      organiseId: { $in: organiserIds },
    });

    // Combine results and ensure uniqueness
    const eventMap = new Map();

    eventTextSearch.forEach((event) => {
      eventMap.set(event._id.toString(), {
        ...event.toObject(),
        textScore: event.score,
      });
    });

    eventOrganiserSearch.forEach((event) => {
      if (!eventMap.has(event._id.toString())) {
        eventMap.set(event._id.toString(), {
          ...event.toObject(),
          textScore: null,
        });
      }
    });

    // Convert map to array and sort combined results by textScore
    const combinedEvents = Array.from(eventMap.values()).sort((a, b) => {
      if (a.textScore && b.textScore) {
        return b.textScore - a.textScore;
      }
      if (a.textScore) {
        return -1;
      }
      if (b.textScore) {
        return 1;
      }
      return 0;
    });

    res.status(200).json({ events: combinedEvents });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Server Error",
    });
  }
};
