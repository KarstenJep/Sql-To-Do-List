$(document).ready(onReady); // Calling jQuery

function onReady() {
    console.log('jQ on standby');
    getToDo(); // pulling To Do List from server
    $('#addTask').on('click', handleAddTask);
    $('#toDoList').on('click', '.completed', handleComplete); // listener for completed click
    $('#toDoList').on('click', '.deleteTask', handleDelete); // listener for delete click
};

// GET to To Do List from server
function getToDo() {
    $.ajax({
        type: 'GET',
        url: '/todo'
    })
    .then(function(response){
        console.log('In GET', response);
        renderToDo(response);
    })
    .catch(function (error) {
        console.log('Error in GET', error);
    })
};

// render/append To Do List to DOM
function renderToDo(list) {
    $('#toDoList').empty();
    for (let i=0; i<list.length; i++) {
        let todo = list[i];
        console.log('in for loop', todo.completed);
        // Conditional to identify if task is completed and append appropriately
        if (todo.completed === true) {
            $('#toDoList').append(`
            <tr class="completedTask">
                <td class="compTask">&nbsp;${todo.task}</td>
                <td class="center">✓</td>
                <td class="center">Woot!</td>
                <td>
                    <button class="deleteTask" data-id="${todo.id}"><b>Delete</b></button>
                </td>
            </tr>
            `)
        } else {
        $('#toDoList').append(`
        <tr class="newTask">
            <td>&nbsp;${todo.task}</td>
            <td class="center">${todo.completed}</td>
            <td>
                <button class="completed" data-id="${todo.id}"><b>Complete</b></button>
            </td>
            <td>
                <button class="deleteTask" data-id="${todo.id}"><b> Delete </b></button>
            </td>
        </tr>
        `)}  
    }
};

// Takes in new task after button is clicked, sends to AJAX POST call
// If new task is empty, triggers alert
function handleAddTask() {
    console.log('addTask clicked');
    let todo = {};
    todo.task = $('#newTask').val();
    if (todo.task == '') {
        alert('Error: input field is empty.')
    } else {
        addTask(todo);
    }   
};

// POST to send new task to server, DB
function addTask(taskToAdd) {
    console.log('addTask', taskToAdd);
    $.ajax({
        type: 'POST',
        url: '/todo',
        data: taskToAdd,
    })
    .then(function (response) {
        console.log('Response from server', response);
        getToDo();
        $('#newTask').val('');
    })
    .catch(function (error) {
        console.log('error in POST', error);
    })
};

// handles complete button, passes data to API PUT call
function handleComplete() {
    console.log('Completing', this);
    completeTask($(this).data("id"), "false");
}

// PUT AJAX call for completing a task
function completeTask(id, completed) {
    $.ajax({
        method: 'PUT',
        url: `/todo/${id}`,
        data: {
            complete: completed
        }
    })
    .then(function (response) {
        console.log('response', response);
        getToDo(); // refresh To Do List
    })
    .catch(error => {
        alert('Error on completing task', error);
    })
}

// handles delete button, and passed id to AJAX DELETE call
function handleDelete() {
    console.log('Deleting', this);
    deleteTask($(this).data("id"));
}

// DELETE AJAX call for deleting task
function deleteTask(id) {
    $.ajax({
        method: 'DELETE',
        url: `/todo/${id}`,
    })
    .then(response => {
        console.log('deleted task', id);
        getToDo();
    })
    .catch(error => {
        alert('error on deleteTask', error)
    })
}