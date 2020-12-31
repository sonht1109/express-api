const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.URL,
    {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', (err) => console.error(err))
db.once('open', ()=> console.log('db connected'))

app.use(express.json())

const userRouter = require('./routes/users')
app.use('/users', userRouter)


app.listen(1405, ()=> {
    console.log('server is running on port 1405');
})