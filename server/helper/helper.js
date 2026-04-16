const formatDuration = (seconds) => {
  if (!seconds || isNaN(seconds)) return "00:00";

  const totalSeconds = Math.floor(seconds);
  const min = Math.floor(totalSeconds / 60);
  const remainSec = totalSeconds % 60;

  const paddedMin = String(min).padStart(2, "0");
  const paddedSeconds = String(remainSec).padStart(2, "0");
  //console.log(paddedMin, paddedSeconds);
  return `${paddedMin}:${paddedSeconds}`;
};

const formatDate = (dateInput) => {
  console.log(dateInput);
  if (!dateInput) return "";

  const day = String(dateInput.getDate()).padStart(2, "0");
  const month = String(dateInput.getMonth() + 1).padStart(2, "0");
  const year = dateInput.getFullYear();

  return `${day}-${month}-${year}`;
};

module.exports = { formatDuration, formatDate };
