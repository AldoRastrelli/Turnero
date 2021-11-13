const MONTHS = 12;

function getToday() { 
  var offset = -3;
  //let todayArg = new Date(new Date().toUTCString());
  let todayArg = new Date(2021,11,7);
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
  // This might need a better implementation
  var day = date.getDate() + extraFactor;
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  let monthEnded = day > daysInMonth(month, year);
  let yearEnded = month > MONTHS;

  let newDay = monthEnded ? 1 : day;
  let newMonth = monthEnded ? (yearEnded ? 1: month + 1 ): month;
  let newYear = yearEnded ? (year + 1) : year;
  return (newDay + separator + newMonth + separator + newYear);
}

function daysInMonth (month, year) {
  return new Date(year, month, 0).getDate();
}

function changeIfHoliday(date) {
  return HOLIDAYS[date] != null ? HOLIDAYS[date] : date;
}