const express = require("express");
const router = express.Router();
const { postservice, deleteService } = require("../controllers/service");

router.patch("/post/:id", postservice); // here :id for Organization id
router.patch("/delete/:id", deleteService);

module.exports = router;
