const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateindex: true
})

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate (value) {
            if (!validator.isEmail(value)) {
                throw new Error('It is not an email!')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate (value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Cannot contain "password"')
            }
        }
        
    }, 
    age: {
        type: Number,
        default: 0,
        validate (value) {
            //custom validator eg. validator module on npm
            if (value < 0) {
                throw new Error('Age must be a positive number!')
            }
        }
    }    
})

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const task = new Task({
    description: 'Learn the mangoose library222'
})

task.save().then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})

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