const express = require('express')
require('../src/db/mongoose')
const validator = require('validator')

const User = require('../src/models/user')
const Task = require('../src/models/task')
const { ObjectId } = require('mongodb')

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

app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch((e) => {
        res.status(500).send()
    })
})

app.get('/users/:id', (req, res) => {
    const _id = req.params.id

    if ( validator.isMongoId(_id) ) {
        User.findById(_id).then((user) => {
            if (!user){
                return res.status(404).send()
            }
            res.send(user)
    
        }).catch((e) => {
            res.status(500).send(e)
        })
    }else {
        res.status(400).send('The id is not a hex 24 length string!')
    }    
})

app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks)
    }).catch((error) => {
        res.status(500).send()
    })
})

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id

    if ( validator.isMongoId(_id) ) {
        Task.findById(_id).then((task) => {
            if (!task) {
                return res.status(404).send()
            }
            res.send(task)
        }).catch((error) => {
            res.status(500).send()
        })
    }else {
        res.status(400).send()
    }
})


app.listen(port, () => {
    console.log('Server up and running on port: ' + port)
})