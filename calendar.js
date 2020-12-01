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
            document.querySelectorAll("td").forEach(element => {
                if(element !== event.currentTarget){
                    element.classList.remove("bg-calendar-cell");
                }
            });
            
            selectedDay = selectedDay === event.currentTarget.id ? undefined : event.currentTarget.id;
            toggledDay = event.currentTarget.classList.toggle("bg-calendar-cell");
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
        firstDay = firstDay -1;
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
                let dateString = year + "-" + ((month < 10) ? ("0" + (month +1)) : (month + 1)) + "-" + ((date <10) ? ("0" + date) : date);
                cell.id = dateString;
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

                const dailyHoliday = holidayGroup.get(dateString);
                const holiday = dailyHoliday && dailyHoliday[0] && dailyHoliday[0].helgdag ? dailyHoliday[0].helgdag : null;
                if (holiday) {
                    const holidaySpanElement = document.createElement('span');
                    const holidayName = document.createTextNode(holiday);
                    holidaySpanElement.appendChild(holidayName);
                    holidaySpanElement.className = 'holiday-text';
                    cell.appendChild(holidaySpanElement);
                }
            }
        }

        document.getElementById("calendar_body").appendChild(row);
    }
};


function daysInMonth() {
    
    let days_in_month = new Date(today.getFullYear(), today.getMonth()+1, 0).getDate();
    
    return days_in_month;
    
};

// Fetch holidays from api.
async function fetchHolidays() {
    try {
        const url = 'https://api.dryg.net/dagar/v2.1/' + currentYear;
        const result = await fetch(url);
        const data = await result.json();
        return groupBy(data.dagar, day => day.datum);
    } catch (error) {
        return new Map();
    }
};


// Change between months
async function getNextMonth() {   
    if (currentMonth !== 11) {
        await updateCalendarDateState(currentMonth + 1, currentYear);
    } else {
        await updateCalendarDateState(0, currentYear + 1);
    }
    loadCalender();
};

async function getPreviousMonth() {   
    if (currentMonth !== 0) {
        await updateCalendarDateState(currentMonth - 1, currentYear);
        
    } else {
        await updateCalendarDateState(11, currentYear - 1);
    }   
    loadCalender();
};

async function updateCalendarDateState(month, year) {
    currentMonth = month;
    currentYear = year;
    const newDate = new Date();
    today = new Date(year, month, newDate.getDate());
    holidayGroup = await fetchHolidays();
};

function addCalendarEventListeners() {
    const backArrow = document.getElementById('back-button');
    backArrow.addEventListener('click', getPreviousMonth);
    const nextArrow = document.getElementById('forward-button');
    nextArrow.addEventListener('click', getNextMonth);
};