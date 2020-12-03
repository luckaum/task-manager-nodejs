const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateindex: true
})



// const task = new Task({
//     description: 'Learn the mangoose library222'
// })

// task.save().then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })

// const me = new User({
//     name: 'Mike Horge',
//     email: 'lucCASafeng@gmail.com',
//     password: 'passWO123'
// })

// me.save().then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })