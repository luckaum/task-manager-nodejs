const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()
const validator = require('validator')
const { ObjectId } = require('mongodb')

router.post('/tasks', auth, async (req, res) => {
    //const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try{
        await task.save()
        res.status(201).send(task)
    }catch (e) {
        res.status(400).send(e)
    }
})

router.get('/tasks', auth, async (req, res) => {
    try{
        await req.user.populate('tasks').execPopulate()
        res.send(req.user.tasks)
    }catch (e) {
        res.status(500).send(e)
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    if ( validator.isMongoId(_id) ) {
        try{
            //const task = await Task.findById(_id)
            const task = await Task.findOne({_id, owner: req.user._id})
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

router.patch('/tasks/:id', auth, async (req, res) => {
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
        
            const task = await Task.findOne({_id, owner: req.user._id})
           
            // const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true})
            if (!task) {
                return res.status(404).send()
            }

            updates.forEach((update) => task[update] = req.body[updates])
            await task.save()
            res.send(task)

        }catch (e) {
            res.status(500).send(e)
        }
    }else {
        res.status(400).send('Invalid id!')
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    if ( validator.isMongoId(_id) ) {
        try {
            const task = await Task.findOneAndDelete({_id, owner: req.user._id})
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