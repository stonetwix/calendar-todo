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
  if (i < 10 || i == 0) {
    i = "0" + i;
  }
  return i;
}

// Adding a 0 before if the hour-minute digits are below 10
function displayTime() {
  var h = date.getHours();
  var m = date.getMinutes();
  m = time(m);
  h = time(h);
  document.querySelector(".time_n").innerHTML = h + ":" + m;
  t = setTimeout(function () {
    time();
  }, 500);
}

displayTime();

document.querySelector(".number-month-year").innerHTML =
  date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();

document.querySelector(".weekday_n").innerHTML = days[date.getDay()];
