const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET all tasks
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "todo" ORDER BY "id";';
    pool.query(queryText).then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error getting books', error);
        res.sendStatus(500);
    });
});

// POST new task 
router.post('/', (req, res) => {
    let newTask = req.body;
    console.log('Adding task', newTask);
    let queryText = `INSERT INTO "todo" ("task")
                    VALUES (1$);`;
    pool.query(queryText, [newTask.task])
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('Error adding new task', error);
            res.sendStatus(500);
        });
});

