const express = require('express')
const Task = require('../models/task')
const router = new express.Router()
const validator = require('validator')

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try{
        await task.save()
        res.status(201).send(task)
    }catch (e) {
        res.status(400).send(e)
    }
})

router.get('/tasks', async (req, res) => {
    try{
        const tasks = await Task.find({})
        res.send(tasks)
    }catch (e) {
        res.status(500).send(e)
    }
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    if ( validator.isMongoId(_id) ) {
        try{
            const task = await Task.findById(_id)
            if (!task) {
                return res.status(404).send()
            }
            res.send(task)
        }catch (e) {
            res.status(500).send(e)
        }
    }else {
        res.status(400).send('Invalid id!')
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((updateItem) => {
        return allowedUpdates.includes(updateItem)
    })    
    if (!isValidOperation) {
        return res.status(400).send('Invalid updates!')
    }
   
    if ( validator.isMongoId(_id) ) {    
        try{
           const task = await Task.findById(_id)

           updates.forEach((update) => task[update] = req.body[updates])

           await task.save()
           
            // const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true})
            if (!task) {
                return res.status(404).send()
            }
            res.send(task)

        }catch (e) {
            res.status(500).send(e)
        }
    }else {
        res.status(400).send('Invalid id!')
    }
})

router.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    if ( validator.isMongoId(_id) ) {
        try {
            const task = await Task.findByIdAndDelete(_id)
            if (!task) {
                return res.status(404).send()
            }
            res.send(task)

        }catch (e) {
            res.status(500).send(e)
        }
    }else {
        res.status(400).send('Invalid id!')
    }
})

module.exports = router