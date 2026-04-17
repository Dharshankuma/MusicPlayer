const {
  getAllSongs,
  gridFilterSongs,
  streamSong,
} = require("../services/songService");

const fetchSongs = async (req, res) => {
  try {
    const search = req.query.search || "";
    console.log(search);
    const songs = await getAllSongs(search);
    return res.status(201).json({
      success: true,
      message: "Successfully fetched Songs",
      data: songs,
    });
  } catch (err) {
    console.error("Error Fetching Songs: ", err);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch songs",
      error: err.message,
    });
  }
};

const playSongs = async (req, res) => {
  try {
    const song = decodeURIComponent(req.params.song);
    const range = req.headers.range;

    const result = await streamSong(song, range);

    if (!result.stream) {
      return res.status(result.status).json({
        message: result.message || "Unable to stream music",
      });
    }

    res.writeHead(result.status, result.headers);

    result.stream.pipe(res);

    result.stream.on("error", (err) => {
      console.error("Stream Error: ", err);
      res.end();
    });
  } catch (err) {
    console.error("Error occured : ", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to play song",
      error: err.message,
    });
  }
};

module.exports = { fetchSongs, playSongs };
