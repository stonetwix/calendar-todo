window.addEventListener('load', start)

function start() {
    addEventListeners();

};

function addEventListeners() {
    document.getElementById('submit-todo').addEventListener('click', handleSubmitButtonClick);
    document.getElementById('display-form').addEventListener('click', toggleInput);
};

function addTodoToDay(day, todo) {
    if (calendarState[day] === undefined) {
        calendarState[day] = [todo];
    } else {
        calendarState[day].push(todo);
    }
};

function addToDoItemToSidebar(todo, index) {
    let newTodoItem = document.createElement('div');
    let textInTodoItem = document.createTextNode(todo.title);
    newTodoItem.appendChild(textInTodoItem);
    const existingDivTodo = document.getElementById('todo-list'); 
    existingDivTodo.appendChild(newTodoItem);
    newTodoItem.classList.add('todo-item');

    // const editIcon = document.createElement('span');
    // editIcon.className = 'fas fa-edit';
    // newTodoItem.appendChild(editIcon);

    const removeIcon = document.createElement('span');
    removeIcon.id = index;
    removeIcon.className = 'fas fa-trash-alt';
    removeIcon.addEventListener('click', removeTodoItem);
    newTodoItem.appendChild(removeIcon);
};

function addAllTodos() {
    document.getElementById('todo-list').innerHTML = '';
    let todos = calendarState[selectedDay];
    
    if (!todos) {
        return;
    }
    
    for (let i = 0; i < todos.length; i++) {
        addToDoItemToSidebar(todos[i], i);
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
    form.style.display = (form.style.display === 'none') ? 'block' : 'none';
    icon.className = (icon.className === 'fas fa-plus-circle') ? 'fas fa-times-circle' : 'fas fa-plus-circle';
};

function removeTodoItem(event) {
    console.log(event.target.id)
    calendarState[selectedDay].splice(Number(event.target.id), 1);
    addAllTodos();
};