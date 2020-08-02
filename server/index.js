const express = require("express");
const bodyPraser = require("body-parser");
const cors = require("cors");
const db = require('./db');
const taskRouter = require('./routes/task-router');

const app = express();
const apiPort = 5000;

app.use(bodyPraser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyPraser.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'))


app.get('/', (req, res) => {
    res.send('Hello world');
});

app.use('/api', taskRouter);


app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));