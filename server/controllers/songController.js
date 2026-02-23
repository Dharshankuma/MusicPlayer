const {
  getAllSongs,
  gridFilterSongs,
  streamSongService,
} = require("../services/songService");
const { gridFilterDTO } = require("../dto/allDTO");

const fetchSongs = async (req, res) => {
  try {
    const queryParams = gridFilterDTO(req.query);
    const songs = await getAllSongs();

    const result = await gridFilterSongs(songs, queryParams);

    console.log(result);

    return res.status(201).json({
      success: true,
      message: "Successfully fetched Songs",
      totalSongs: result.total,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
      data: result.data,
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
    const { song } = req.params;
    const range = req.headers.range;

    const result = await streamSongService(song, range);

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
