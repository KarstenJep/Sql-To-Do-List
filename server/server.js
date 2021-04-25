const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use( bodyParser.json());
app.use(express.static('server/public'));

const taskRouter = require('./routes/task_router.js');
app.use('/todo', taskRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('listening on port', PORT);
});