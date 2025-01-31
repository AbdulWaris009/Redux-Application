const express  = require('express')
const connectToDB = require('./config/db')
const userRoutes = require('./routes/user')
const cors = require('cors')
const app = express()
const PORT = 3000;

connectToDB()
app.use(cors())
app.use(express.json())
app.use(express.static("public"))

app.use("/api/v1/",userRoutes)

app.use("/",(req,res)=>{
    res.send("Hello World!")
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})