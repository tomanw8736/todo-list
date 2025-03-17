//
// My second node.js project! Woohoo!
// Feeling kinda motivated so
// I'm gonna test out inquirer
// and hopefully make a todo
// app with it.
//

// imports
import { input, select } from "@inquirer/prompts";
import { readFileSync, writeFileSync} from 'fs' ; // please let me know if there's an import for this

const filePath = 'todo.json';

// loading todos
function loadTodos() {
    try {
        const fileData = readFileSync(filePath, 'utf8');
        return JSON.parse(fileData);
    } catch (error) {
        return []; // return an empty array if file no no exist
    }
}

// saving todos
function saveTodos(todos) {
    writeFileSync(filePath, JSON.stringify(todos, null, 2));
}

// display the todos
function displayTodos(todos) {
    if (todos.length === 0) {
        console.log('No todos yet!');
    } else {
        todos.forEach((todo, index) => {
            console.log(`${index + 1} | ${todo}`);
        });
    }
}

// main menu
async function mainMenu() {
    const todos = loadTodos();
    displayTodos(todos);
    const menu = await select({
        message: 'Pick An Option:',
        choices: [
            //{
            //    name: 'View Todos',
            //    value: 'view'
            //},
            {
                name: 'Add A Todo',
                value: 'add'
            },
            {
                name: 'Remove A Todo',
                value: 'remove'
            },
            {
                name: 'Exit',
                value: 'exit'
            },
        ]
    });

    //if (menu === 'view') {
    //    displayTodos(todos);
    //    mainMenu();
    if (menu === 'add') {
        const newTodo = await input({
            message: 'Enter Todo:'
        })
        todos.push(newTodo);
        saveTodos(todos);
        console.log('Todo Added!')
        mainMenu();
    } else if (menu === 'remove') {
        if (todos.length === 0) {
            console.log('No Todos To Remove!')
            mainMenu();
        }

        // actually removing the todo
        const { indexToRemove } = await select({
            message: 'Choose a todo to remove:',
            choices: todos.map((todo, index) => ({
                name: todo,
                value: index
            })),
        });
        todos.splice(indexToRemove, 1);
        saveTodos(todos);
        console.log('Removed todo!');
        mainMenu();
    } else {
        console.log('Bye bye :3')
    }
}

mainMenu();