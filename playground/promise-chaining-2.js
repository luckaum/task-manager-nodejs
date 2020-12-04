 require('../src/db/mongoose')
 const Task = require('../src/models/task')

//  Task.findByIdAndDelete('5fc926d79d3c8b335cf76c48').then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false })
//  }).then((result) => {
//     console.log(result)
//  }).catch((e) => {
//      console.log(e)
//  })

 const deleteTaskAndCount = async (id) => {
   await Task.findByIdAndDelete(id)
   const count = await Task.countDocuments({ completed: false })
   return count
 }

 deleteTaskAndCount('5fca6c27ec4ddb3054fa54b4').then((count) => {
    console.log(count)
 }).catch((e) => {
    console.log(e)
 })