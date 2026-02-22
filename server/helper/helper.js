const formatDuration = (seconds) => {
  if (!seconds || isNaN(seconds)) return "00:00";

  const totalSeconds = Math.floor(seconds);
  const min = Math.floor(totalSeconds / 60);
  const remainSec = totalSeconds % 60;

  const paddedMin = String(min).padStart(2, "0");
  const paddedSeconds = String(remainSec).padStart(2, "0");

  return `${paddedMin}:${paddedSeconds}`;
};

module.exports = { formatDuration };
