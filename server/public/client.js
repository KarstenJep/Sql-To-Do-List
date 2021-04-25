$(document).ready(onReady);

function onReady() {
    console.log('jQ on standby');
    getToDo();
    $('#addTask').on('click', handleAddTask);
    $('#toDoList').on('click', '.completed', handleComplete);
    $('#toDoList').on('click', '.deleteTask', handleDelete);
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
        console.log('in for loop', todo.completed);

        if (todo.completed === true) {
            $('#toDoList').append(`
            <tr>
                <td>${todo.task}</td>
                <td>${todo.completed}</td>
                <td></td>
                <td>
                    <button class="deleteTask" data-id="${todo.id}">Delete Completed Task</button>
                </td>
            </tr>
        `) 
        } else {
        $('#toDoList').append(`
        <tr>
            <td>${todo.task}</td>
            <td>${todo.completed}</td>
            <td>
                <button class="completed" data-id="${todo.id}">Task Complete</button>
                <button class="deleteTask" data-id="${todo.id}">Delete Task</button>
            </td>
        </tr>
        `)}  
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

function handleComplete() {
    console.log('Completing', this);
    completeTask($(this).data("id"), "false");
}

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
        getToDo();
    })
    .catch(error => {
        alert('Error on completing task', error);
    })
}

function handleDelete() {
    console.log('Deleting', this);
    deleteTask($(this).data("id"));
}

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