const fs = require("fs/promises");
const path = require("path");
const mm = require("music-metadata");
const { formatDuration } = require("../helper/helper");

const { downloadPath } = require("../config/config");
const { start } = require("repl");

console.log(downloadPath);
const getAllSongs = async () => {
  const files = await fs.readdir(downloadPath);

  const mp3Files = await Promise.all(
    files
      .filter((file) => file.toLowerCase().endsWith("mp3"))
      .map(async (file, index) => {
        const fullPath = path.join(downloadPath, file);
        const stats = await fs.stat(fullPath);

        const metaData = await mm.parseFile(fullPath);

        let coverImage = null;
        if (metaData.common.picture && metaData.common.picture.length > 0) {
          const picture = metaData.common.picture[0];
          coverImage = `data${picture.format};base64,${picture.data.toString("base64")}`;
        }
        return {
          id: index + 1,
          fileName: file,
          title: metaData.common.title || file,
          artist: metaData.common.artist || "",
          album: metaData.common.album | "",
          duration: formatDuration(metaData.format.duration),
          size: stats.size,
          createdAt: stats.birthtime,
        };
      }),
  );

  return mp3Files;
};

const gridFilterSongs = (songs, query) => {
  let filtered = [...songs];

  if (query.search) {
    filtered = filtered.filter(
      (song) =>
        song.title.toLowerCase().includes(query.search) ||
        song.album.toLowerCase().includes(query.search) ||
        song.artist.toLowerCase().includes(query.search),
    );
  }

  filtered.sort((a, b) => {
    const valueA = a[query.sort];
    const valueB = b[query.sort];

    if (!valueA || !valueB) return 0;

    if (query.order === "desc") {
      return valueA > valueB ? -1 : 1;
    }
    return valueA > valueB ? 1 : -1;
  });

  const startIndex = (query.page - 1) * query.total;
  const endIndex = startIndex + query.total;

  const paginated = filtered.slice(startIndex, endIndex);

  return {
    total: filtered.length,
    totalPages: Math.ceil(filtered.length / query.total),
    currentPage: query.page,
    data: paginated,
  };
};

module.exports = { getAllSongs, gridFilterSongs };
