const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET /todo data from DB, send it to client
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "todo" ORDER BY "id";';
    pool.query(queryText)
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('error getting books', error);
            res.sendStatus(500);
        });
});

// POST new task to /todo in DB
// request body must be a object with task
router.post('/', (req, res) => {
    let newTask = req.body;
    console.log('Adding task', req.body);
    let queryText = `INSERT INTO "todo" ("task")
                    VALUES ($1);`;
 
    pool.query(queryText, [newTask.task])
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('Error adding new task', error);
            res.sendStatus(500);
        })
});

// PUT sends to DB and updates "completed" to 'true' for task 
// request must include id param indicating which task
router.put('/:id', (req, res) => {
    console.log('In router.put', req.body);
    let taskId = req.params.id;
    let complete = req.body.complete;
    let queryText = `UPDATE "todo" SET "completed"=true WHERE "id"=$1;`;

    pool.query(queryText, [taskId])
        .then(response => {
            console.log('Task completed', response);
            res.sendStatus(200);
        })
        .catch(error => {
            console.log(`Error making DB query ${queryText}`, error);
            res.sendStatus(500);
        })
});

// DELETE sends task id to DB to be deleted from /todo
// request must include id param indicating which task
router.delete('/:id', (req, res) => {
    const taskToDelete = req.params.id;
    console.log('Delete request id', taskToDelete);

    const queryText = `DELETE FROM "todo" WHERE id=$1;`;
    pool.query(queryText, [taskToDelete])
        .then(result => {
            console.log('Task deleted', taskToDelete);
            res.sendStatus(200);
        })
        .catch(err => {
            console.log(`Error making DB query ${queryText}`, error);
            res.sendStatus(500);
        })
});

module.exports = router;