const express = require("express");
const router = express.Router();

const { fetchSongs, playSongs } = require("../controllers/songController");

router.get("/fetchSongs", fetchSongs);
router.get("/playSong/:song", playSongs);

module.exports = router;
