// Here goes all initial functions, states and global variables.

window.addEventListener('load', main);

async function main() {
    loadTodos();
    holidayGroup = await fetchHolidays();
    loadCalender();
    // loadToday();
};

let selectedDay;
let editTodoIndex;
let todoList = [];
let holidayGroup;

// Function found on Stackoverflow...
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