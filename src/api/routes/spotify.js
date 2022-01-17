const express = require("express");
const router = express.Router();

// get the routes.
const {
  getAlbumsFromArtist,
  getCurrentUserInfo,
  getTopTracks,
  getTopFiters,
} = require("../controllers");

// bbind routes with controller.
router.get("/artistAlbums", getAlbumsFromArtist);
router.get("/userInfo", getCurrentUserInfo);
router.get("/topTracks", getTopTracks);
router.get("/topFilters", getTopFiters);

module.exports = router;
