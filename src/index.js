const express = require('express')
require('../src/db/mongoose')

const User = require('../src/models/user')
const Task = require('../src/models/task')

const app = express()

const port = process.env.PORT || 3000

app.use(express.json()) //prepares to receive req with json files

app.post('/users', (req, res) => {
    const user = new User(req.body)
    user.save().then((result) => {
        res.status(201).send(user)
    }).catch((error) => {
        res.status(400).send(error)
    })
})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body)
    task.save().then((result) => {
        res.status(201).send(task)
    }).catch((error) => {
        res.status(400).send(error)
    })
})

app.listen(port, () => {
    console.log('Server up and running on port: ' + port)
})