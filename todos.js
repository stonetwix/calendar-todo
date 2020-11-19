window.addEventListener('load', start)

function start() {
    addEventListeners();

}

function addEventListeners() {
    document.getElementById('submit-todo').addEventListener('click', handleSubmitButtonClick);
    document.getElementById('display-form').addEventListener('click', toggleInput);
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

function handleSubmitButtonClick(event) {
    event.preventDefault();
    const inputElement = document.getElementById('add-todo-input');
    addTodoToDay(selectedDay, {title: inputElement.value});
    addAllTodos();
};

function toggleInput() {
    const form = document.getElementById('form');
    const icon = document.getElementById('display-form');
    let toggleForm = (form.style.display === 'none') ? form.style.display = 'block' : form.style.display = 'none';
    let toggleIcon = (icon.className === 'fas fa-plus-circle') ? icon.className = 'fas fa-times-circle' : icon.className = 'fas fa-plus-circle';
}