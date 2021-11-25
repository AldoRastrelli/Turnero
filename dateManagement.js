const MONTHS = 12;

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
  // This might need a better implementation
  var day = date.getDate() + extraFactor;
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  let monthEnded = day > daysInMonth(month, year);
  let yearEnded = monthEnded && month + 1 > MONTHS;

  let newDay = monthEnded ? extraFactor : day;

  let newMonth = monthEnded ? (yearEnded ? 1 : month + 1 ): month;


  let newYear = yearEnded ? (year + 1) : year;
  return (newDay + separator + newMonth + separator + newYear);
}

function daysInMonth (month, year) {
  return new Date(year, month, 0).getDate();
}

function changeIfHoliday(date) {
  return HOLIDAYS[date] != null ? HOLIDAYS[date] : date;
}

function getCompleteDate(date) {
  let dayoftheweek = date.getDay()
  let weekdayDay = isFriday(dayoftheweek) ? weekday[0] : weekday[dayoftheweek];
  let extraFactor = isFriday(dayoftheweek) ? 3 : 1;

  return weekdayDay + " " + getStringDate(date, "/", extraFactor); 
}

function isHoliday(date) {
  let dayoftheweek = date.getDay()
  let weekdayDay = weekday[dayoftheweek-1];
  let fullDate = weekdayDay + " " + getStringDate(date, "/", 0); 

  return HOLIDAYS[fullDate] != null;
}