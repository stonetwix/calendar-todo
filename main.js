// Here goes all initial functions, states and global variables.

window.addEventListener('load', main);

function main() {
    loadCalender();
    // loadTodos();
    // loadToday();
};


let calendarState = {
    '2020-11-17': [{title: 'Work'}], 
}

let selectedDay;
let editTodoIndex;
const todoList = [];