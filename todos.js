
function addEventListeners() {
const addTodoElement = document.getElementById('add-todo');
addTodoElement.addEventListener('click', openModal);

}

function addTodoToDay(day, todo) {
    if (calendarState[day] === undefined) {
        calendarState[day] = [todo];
    } else {
        calendarState[day].push(todo);
    }
};

function addToDoItemToSidebar(todo) {
    let newTodoItem = document.createElement('div');
    let textInTodoItem = document.createTextNode(todo.title);
    newTodoItem.appendChild(textInTodoItem);
    const existingDivTodo = document.getElementById('todo-list'); 
    existingDivTodo.appendChild(newTodoItem);
    newTodoItem.classList.add('todo-item');
    
};

function addAllTodos() {
    document.getElementById('todo-list').innerHTML = '';
    let todos = calendarState[selectedDay];
    
    for (const todo of todos) {
        addToDoItemToSidebar(todo);
    }  
};