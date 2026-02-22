const { getAllSongs, gridFilterSongs } = require("../services/songService");
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
      error: error.message,
    });
  }
};

module.exports = { fetchSongs };
