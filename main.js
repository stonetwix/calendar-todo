// Here goes all initial functions, states and global variables.

window.addEventListener('load', main);

function main() {

};


let calendarState = {
    '2020-11-17': [{title: 'Work'}],
}

let selectedDay = '';

function addTodoToDay(day, todo) {
    if (calendarState[day] === undefined) {
        calendarState[day] = [todo];
    } else {
        calendarState[day].push(todo);
    }
};