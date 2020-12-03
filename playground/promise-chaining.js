require('../src/db/mongoose')
const User = require('../src/models/user')

User.findByIdAndUpdate("5fc90672058f371af8a0aafa", { age: 1 }).then((user) => {
    console.log(user)
    return User.countDocuments({ age: 1 })
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})