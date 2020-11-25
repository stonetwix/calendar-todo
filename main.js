// Here goes all initial functions, states and global variables.

window.addEventListener('load', main);

function main() {
    loadCalender();
    // loadTodos();
    // loadToday();
};

let selectedDay;
let editTodoIndex;
const todoList = [{title: 'Work', date: '2020-11-25'}];

function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
}