const express = require("express");
const router = express.Router();

const { fetchSongs } = require("../controllers/songController");

router.get("/fetchSongs", fetchSongs);

module.exports = router;
