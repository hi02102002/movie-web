const convertTime = num => {
  var hours = Math.floor(num / 60);
  var minutes = num % 60;
  if (hours < 1) {
    return `${minutes}m`;
  }

  if (minutes < 1) {
    return `${hours}h`;
  }

  return `${hours}h${minutes}m`;
};

export default convertTime;
