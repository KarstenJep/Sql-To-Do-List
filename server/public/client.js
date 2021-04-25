$(document).ready(onReady);

function onReady() {
    console.log('jQ on standby');
    getToDo();
    $('#addTask').on('click', handleAddTask);
    // code for complete/delete
};

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

function renderToDo(list) {
    $('#toDoList').empty();
    for (let i=0; i<list.length; i++) {
        let todo = list[i];
        $('#toDoList').append(`
        <tr>
            <td>${todo.task}</td>
            <td>${todo.completed}</td>
            <td>
                <button class="completed" data-id="${todo.id}">Completed</button>
                <button class="removeTask" data-id="${todo.id}">Remove Task</button>
            </td>
        </tr>
        `)     
    }
};

function handleAddTask() {
    console.log('addTask clicked');
    let todo = {};
    todo.task = $('#newTask').val();
    // possible a .completed
    addTask(todo);
};

function addTask(taskToAdd) {
    $.ajax({
        type: 'POST',
        url: '/todo',
        data: taskToAdd,
    })
    .then(function (response) {
        console.log('Response from server', response);
        $('#newTask').val(''),
        getToDo();
    })
    .catch(function (error) {
        console.log('error in POST', error);
    })
};


