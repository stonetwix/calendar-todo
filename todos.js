window.addEventListener('load', start)

function start() {
    addEventListeners();
    addAllTodos();
};

function addEventListeners() {
    document.getElementById('submit-todo').addEventListener('click', handleSubmitButtonClick);
    document.getElementById('save-todo').addEventListener('click', editEventHandler);
};

function addToDoItemToSidebar(todo, index) {
    const newTodoItem = document.createElement('div');
    const dateSpanElement = document.createElement('span');
    dateSpanElement.className = 'todo-date-span';
    const dateInTodoItem = document.createTextNode(todo.date + ' ');
    dateSpanElement.appendChild(dateInTodoItem);

    
    const textInTodoItem = document.createTextNode(todo.title);
    newTodoItem.appendChild(dateSpanElement);
    newTodoItem.appendChild(textInTodoItem);
    const existingDivTodo = document.getElementById('todo-list'); 
    existingDivTodo.appendChild(newTodoItem);
    newTodoItem.classList.add('todo-item');

    const removeIcon = document.createElement('span');
    removeIcon.id = index;
    removeIcon.className = 'fas fa-trash-alt';
    removeIcon.addEventListener('click', removeTodoItem);
    newTodoItem.appendChild(removeIcon);

    const editIcon = document.createElement('span');
    editIcon.id = index;
    editIcon.className = 'fas fa-edit';
    editIcon.addEventListener('click', editTodoItem);
    newTodoItem.appendChild(editIcon);
};

function filterTodos(date) {
    const output = [];
    for (let i = 0; i < todoList.length; i++) {
        let todo = todoList[i];
        todo.index = i;
        if (!date || date === todoList[i].date) {
            output.push(todo);
        }
    }
    return output.sort((x, y) => x.date < y.date ? -1 : (x.date > y.date ? 1 : 0));
};

function addAllTodos() {
    document.getElementById('todo-list').innerHTML = '';
    //let todos = calendarState[selectedDay];
    const todos = filterTodos(selectedDay);
    for (const todo of todos) {
        addToDoItemToSidebar(todo, todo.index);
    }  
};

function handleSubmitButtonClick(event) {
    event.preventDefault();
    const inputElement = document.getElementById('add-todo-input');
    let dateFromDatepicker = $('#datepicker').data().datepicker.getFormattedDate('yyyy-mm-dd');
    todoList.push({title: inputElement.value, date: dateFromDatepicker});
    addAllTodos();
    inputElement.value = '';
};

function removeTodoItem(event) {
    todoList.splice(Number(event.target.id), 1);
    addAllTodos();
};

function editTodoItem(event) {
    const index = Number(event.target.id);
    editTodoIndex = index;
    const title = todoList[index].title;
    document.getElementById('add-todo-input').value = title;
    document.getElementById('submit-todo').style.display = 'none';
    document.getElementById('save-todo').style.display = 'flex';
};

function editEventHandler(event) {
    event.preventDefault();
    todoList[editTodoIndex].title = document.getElementById('add-todo-input').value;
    addAllTodos();
    document.getElementById('submit-todo').style.display = 'flex';
    document.getElementById('save-todo').style.display = 'none';
    document.getElementById('add-todo-input').value = '';
};

$(function () {
    $("#datepicker").datepicker({ 
          autoclose: true, 
          todayHighlight: true,
          weekStart: 1,
    }).datepicker('update', new Date());
  });