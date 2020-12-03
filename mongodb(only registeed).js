//CRUD create read update delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

// The same as up above
const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017' //localhost leaves the application slow
const databaseName = 'task-manager' //database's name


MongoClient.connect(connectionURL, {useUnifiedTopology: true} , { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unuable to connect to the database!')
    }
    
    const db = client.db(databaseName)

    db.collection('users').deleteMany({
        age: 30
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })



    // db.collection('users').updateOne({ 
    //     _id: new ObjectID("5fc7bf8f4f46b719a0044e97")
    //  }, {
    //      $inc: {
    //          age: 2
    //      }
    //  }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })


    // db.collection('users').findOne({ _id: new ObjectID("5fc7bf8f4f46b719a0044e97") }, (error, user) => {
    //     if (error) {
    //         return console.log('There was an error!')
    //     }
    //     console.log(user)
    // })

    // db.collection('users').find({ age: 40 }).toArray((error, users) => {
    //     console.log(users)
    // })

    // db.collection('users').find({ age: 40 }).count((error, count) => {
    //     console.log(count)
    // })

    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Andrew',
    //     age: 99
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user!')
    //     }
    //     console.log(result.insertedCount)

    // })

    // db.collection('users').insertMany([{name: 'Lucas', age: 40}, {name: 'Andre', age: 37}], (error, result) => {
    //     if (error){
    //         return console.log('There was an error!')
    //     }
        
    //     console.log(result.ops)
    // })


})
