const date = new Date();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function time(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function displayTime() {
  var h = date.getHours();
  var m = date.getMinutes();
  document.querySelector(".time_n").innerHTML = h + ":" + m;
  t = setTimeout(function () {
    time();
  }, 500);
}

displayTime();

document.querySelector(".month-year").innerHTML =
  months[date.getMonth()] + " " + date.getFullYear();
document.querySelector(".number_n").innerHTML = date.getDate();
document.querySelector(".weekday_n").innerHTML = days[date.getDay()];
