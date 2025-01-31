const mongoose = require('mongoose')

const connectToDB = ()=>{
    mongoose.connect('mongodb://localhost:27017/UMS',)
    .then(()=>{
        console.log('Connected to MongoDB')
    })
    .catch(()=>{
        console.log('Error connecting to MongoDB')
    })
}
module.exports = connectToDB;