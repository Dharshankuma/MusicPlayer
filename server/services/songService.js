const fs = require("fs/promises");
const fsSync = require("fs");
const path = require("path");
const mm = require("music-metadata");
const { formatDuration, formatDate } = require("../helper/helper");

const { downloadPath } = require("../config/config");
const { start } = require("repl");

const getAllSongs = async (search = "") => {
  const files = await fs.readdir(downloadPath);

  const mp3Files = await Promise.all(
    files
      .filter((file) => file.toLowerCase().endsWith("mp3"))
      .map(async (file, index) => {
        const fullPath = path.join(downloadPath, file);
        const stats = await fs.stat(fullPath);

        const metaData = await mm.parseFile(fullPath);
        //console.log(metaData);
        let coverImage = null;
        if (metaData.common.picture && metaData.common.picture.length > 0) {
          const picture = metaData.common.picture[0];
          const base64String = Buffer.from(picture.data).toString("base64");

          coverImage = `data:${picture.format};base64,${base64String}`;
          //coverImage = `data:${picture.format};base64,${picture.data.toString("base64")}`;
        }

        return {
          id: index + 1,
          fileName: file,
          title: metaData.common.title || file,
          artist: metaData.common.artist || "",
          album: metaData.common.album || "",
          duration: formatDuration(metaData.format.duration),
          size: stats.size,
          createdAt: formatDate(stats.birthtime),
          coverImage: coverImage,
        };
      }),
  );

  mp3Files.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  if (search) {
    const lowerSearch = search.toLowerCase();

    return mp3Files.filter(
      (song) =>
        (song.title?.toLowerCase() || "").includes(lowerSearch) ||
        (song.fileName?.toLowerCase() || "").includes(lowerSearch) ||
        (song.artist?.toLowerCase() || "").includes(lowerSearch) ||
        (song.album?.toLowerCase() || "").includes(lowerSearch),
    );
  } else {
    return mp3Files;
  }
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

const streamSong = async (song, range) => {
  const songPath = path.join(downloadPath, song);

  try {
    await fs.access(songPath);
  } catch {
    return {
      status: 404,
      stream: null,
      message: "Song not found",
    };
  }

  const stat = await fs.stat(songPath);
  const fileSize = stat.size;

  if (!range) {
    return {
      status: 400,
      headers: {},
      stream: null,
      message: "Range Required",
    };
  }

  const parts = range.replace(/bytes=/, "").split("-");
  const start = path.parseInt(parts[0], 10);

  if (isNaN(start)) {
    return {
      status: 400,
      stream: null,
      message: "Invalid range header",
    };
  }

  const end = parts[1]
    ? Math.min(parseInt(parts[1], 10), fileSize - 1)
    : fileSize - 1;

  const chunkSize = end - start + 1;

  const fileStream = fs.createReadStream(songPath, {
    start,
    end,
  });

  return {
    status: 206,
    headers: {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Range": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "audio/mpeg",
    },
    stream: fileStream,
  };
};
// const streamSongService = async (song, range) => {
//   const songPath = path.join(downloadPath, song);

//   try {
//     await fs.access(songPath);
//   } catch {
//     return {
//       status: 404,
//       stream: null,
//       message: "Song not found",
//     };
//   }

//   const stat = await fs.stat(songPath);
//   const fileSize = stat.size;

//   if (!range) {
//     return {
//       status: 400,
//       headers: {},
//       stream: null,
//       message: "Range Required",
//     };
//   }

//   const parts = range.replace(/bytes=/, "").split("-");
//   const start = parseInt(parts[0], 10);

//   if (isNaN(start)) {
//     return {
//       status: 400,
//       stream: null,
//       message: "Invalid Range header",
//     };
//   }

//   const end = parts[1]
//     ? Math.min(parseInt(parts[1], 10), fileSize - 1)
//     : fileSize - 1;

//   const chunkSize = end - start + 1;

//   const fileStream = fsSync.createReadStream(songPath, {
//     start,
//     end,
//   });

//   return {
//     status: 206,
//     headers: {
//       "Content-Range": `bytes ${start}-${end}/${fileSize}`,
//       "Accept-Range": "bytes",
//       "Content-Length": chunkSize,
//       "Content-Type": "audio/mpeg",
//     },
//     stream: fileStream,
//   };
// };

module.exports = { getAllSongs, gridFilterSongs, streamSong };
