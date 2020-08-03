const dayOfWeekAsString = (dayIndex) => {
  return (
    [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ][dayIndex] || ""
  );
};

export const formatTime = (time) => {
  var utcSeconds = parseInt(time.replace(/,/g, ""), 10) / 1000;
  var d = new Date(0);
  d.setUTCSeconds(utcSeconds);
  var hours = d.getHours();
  var minutes = d.getMinutes();
  var seconds = d.getSeconds();
  var AmOrPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  if (minutes < 10) {
    minutes = minutes.toString().padStart(2, "0");
  }
  if (seconds < 10) {
    seconds = seconds.toString().padStart(2, "0");
  }
  var formattedTime = `${hours}:${minutes}:${seconds} ${AmOrPm}`;
  return `${dayOfWeekAsString(d.getDay())} ${d.getDate()}/${
    d.getMonth() + 1
  }/${d.getFullYear()} ${formattedTime}`;
};

export const sortPhotosByTime = (photos) => {
  return photos.sort(function (a, b) {
    return (
      new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
    );
  });
};

export const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};
