const express = require('express')
require('../src/db/mongoose')
const validator = require('validator')
const userRouter = require('../src/routers/user')
const taskRouter = require('../src/routers/task')

const User = require('../src/models/user')
const Task = require('../src/models/task')
const { ObjectId } = require('mongodb')
const { rawListeners } = require('../src/models/user')

const app = express()

const port = process.env.PORT || 3000

app.use(express.json()) //prepares to receive req with json files

app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server up and running on port: ' + port)
})