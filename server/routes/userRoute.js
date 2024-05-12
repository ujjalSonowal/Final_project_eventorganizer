const express = require("express");

const router = express.Router();

const {
  alluser,
  getsingleuser,
  deleteuser,
  updateuser,
} = require("../controllers/usercontroller");
const { login, singup } = require("../controllers/authcontroller");

router.post("/login", login);
router.post("/signup", singup);
//get all user
router.get("/", alluser);
// getsingle use
router.get("/:id", getsingleuser);
//delete
router.delete("/delete/:id", deleteuser);
//update
router.patch("/update/:id", updateuser);

module.exports = router;
