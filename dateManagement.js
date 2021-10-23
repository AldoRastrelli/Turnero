function getToday() {
  var offset = -3;
  let todayArg = new Date(new Date().toUTCString());
  console.log(todayArg);
  return todayArg;
}

function isFriday(day) {
  return day == 5;
}

function isWeekend(day) {
  return day == 6 || day == 0;
}

function getStringDate(date, separator, extraFactor) {
    return (date.getDate() + extraFactor + separator + (date.getMonth() + 1) + separator + date.getFullYear());
}