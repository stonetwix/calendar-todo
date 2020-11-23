// Here goes functions etc regarding calendar / main.

today = new Date();
currentMonth = today.getMonth();
console.log(currentMonth);
currentYear = today.getFullYear();
console.log(currentYear);

months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",];

monthAndYear = document.getElementById("monthAndYear");
console.log(monthAndYear)

showCalendar(currentMonth, currentYear)



function showCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay() +6;
    console.log(firstDay);

    monthAndYear.innerText = months[month] + " " + year;
    console.log(monthAndYear)


    let date = 1;
    for(let i = 0; i < 6; i++) {
       
        let row = document.createElement("tr");

        for(let j = 0; j < 7; j++){
            if(i === 0 && j < firstDay){
                cell = document.createElement("td");
                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if(date > daysInMonth(month, year)){
                break
            }
            else {
                cell = document.createElement("td");
                cell.id = '2020-11-' + date;
                cell.addEventListener('click', event => {
                selectedDay = event.target.id;
                addAllTodos();
                })
                cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");
                } 
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }
        }

        document.getElementById("calendar_body").appendChild(row);
    }


};


function daysInMonth() {

    const now = new Date();
    const days_in_month = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
    // for(let i = 1; i <=x ; i++){
    //     output += "day " + i + ", ";
    //     console.log(output);
    // }
    // document.getElementById("calendar_body").innerText = output;
    return days_in_month;
    
};

console.log(daysInMonth());




