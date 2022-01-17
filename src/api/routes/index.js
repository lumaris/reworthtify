const express = require("express");
const router = express.Router();

const spotify = require("./spotify.js");
// Routes
router.use("/spotify", spotify);

module.exports = router;