const date = new Date();

let date = 1;
for (let i = 0; i < 6; i++) {
  let row = document.createElement("tr");

  for (let j = 0; j < 7; j++) {
    if (i === 0 && j < firstDay) {
      cell = document.createElement("td");
      cellText = document.createTextNode("");
      cell.appendChild(cellText);
      row.appendChild(cell);
    } else if (date > daysInMonth(month, year)) {
      break;
    } else {
      cell = document.createElement("td");
      cellText = document.createTextNode(date);
      if (
        date === today.getDate() &&
        year === today.getFullYear() &&
        month === today.getMonth()
      ) {
        cell.classList.add("bg-info");
      }
      cell.appendChild(cellText);
      row.appendChild(cell);
      date++;
    }
  }

  document.getElementById("calendar_body").appendChild(row);
}

i.eventListener("click", function () {});

var element = document.getElementById("calendar_body");
var myCalendar = jsCalendar.new(element);
var i = document.getElementById("arrow");
i.addEventListener(
  "click",
  function () {
    myCalendar.next();
  },
  false
);
