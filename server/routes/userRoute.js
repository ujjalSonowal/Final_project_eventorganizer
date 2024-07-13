const express = require("express");

const router = express.Router();

const {
  alluser,
  getsingleuser,
  deleteuser,
  updateuser,
  searchUsers,
} = require("../controllers/usercontroller");
const { login, signup } = require("../controllers/authcontroller");

router.post("/login", login);
router.post("/signup", signup);
//get all user
router.get("/", alluser);
// getsingle use
router.get("/:id", getsingleuser);
//delete
router.delete("/delete/:id", deleteuser);
//update
router.patch("/update/:id", updateuser);
router.get("/search", searchUsers);

module.exports = router;
