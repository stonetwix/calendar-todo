// Here goes functions etc regarding calendar / main.

today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();

months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",];

function loadCalender() {
    document.getElementById("calendar_body").innerHTML = '';
    showCalendar(currentMonth, currentYear);
    document.querySelectorAll("td").forEach(element => {
        element.addEventListener("click", event => { 
            selectedDayID = event.currentTarget.id;
            const x = element.classList;
            toggledDay = event.currentTarget.classList.toggle(selectedDayID);
            document.querySelectorAll("td").forEach(element => {
                if(element !== event.currentTarget){
                    element.classList.remove("bg-calendar-cell");
                    // while (classList.length > 0) {
                    //     classList.remove(classList.item(0));
                    // }
                }
            });
            
            selectedDay = selectedDay === event.currentTarget.id ? undefined : event.currentTarget.id;
            toggledDay1 = event.currentTarget.classList.toggle("bg-calendar-cell");
            addAllTodos();
            
        });
    });   
};

function showCalendar(month, year) {
    
    let firstDay = (new Date(year, month)).getDay();
    if(firstDay === 0){
        firstDay = firstDay +6;
    }
    else {
        firstDay;
    }
    
    const monthAndYear = document.getElementById("monthAndYear");
    monthAndYear.innerText = months[month] + " " + year;

    const dateGroup = groupBy(todoList, todo => todo.date);

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
                let dateString = year + "-" + (month +1) + "-" + date;
                cell.id = dateString;

                // console.log(cell.id);
                // cell.addEventListener('click', event => {
                   
                //     selectedDayID = event.target.id;
                    
                //     /** @type {boolean} */
                //     selectedDayClassToggle = event.currentTarget.classList.toggle(selectedDayID)
                //     selectedDay = event.currentTarget.classList[0];
                //     addAllTodos();
                    
                // })
                cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("text-current-day");
                } 
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
                
                const dailyTodos = dateGroup.get(dateString);

                if (dailyTodos) {
                    const todoCountSpanElement = document.createElement('span')
                    const todoCountNumber = document.createTextNode(dailyTodos.length);
                    todoCountSpanElement.appendChild(todoCountNumber);
                    todoCountSpanElement.className = 'badge badge-pill badge-danger';
                    cell.appendChild(todoCountSpanElement);  
                }
            }
        }

        document.getElementById("calendar_body").appendChild(row);
    }


};


function daysInMonth() {
    
    const now = new Date();
    let days_in_month = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
    
    return days_in_month;
    
};





