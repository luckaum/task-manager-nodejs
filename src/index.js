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

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET resquests are disabled')
//     }else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('Site is currently down. Check back soon!')
// })

app.use(express.json()) //prepares to receive req with json files

app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server up and running on port: ' + port)
})

const main = async () => {
    // const task = await Task.findById('5fcef9cc94cfc81b10a95271')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    const user = await User.findById('5fcef7b9acae930ac4c9357a')
    await user.populate('tasks').execPopulate()
    console.log(user)
} 

main()