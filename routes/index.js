const express = require("express");
const router = express.Router();

//prefix router Approve
const favorite = require("./favorite");
router.use("/", favorite);

//prefix router Dev


module.exports = router;
