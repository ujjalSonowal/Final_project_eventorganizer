const express = require("express");
const { searchController } = require("../controllers/filterController");

const router = express.Router();

router.get("/search", searchController);

module.exports = router;
