const express = require('express')
require('dotenv').config()
require('./database/connection')

const TestRoute = require('./routes/testRoute')

const app = express()
const port = process.env.PORT

app.use('/api', TestRoute)


app.listen(port, ()=>{
    console.log(`Server started successfully at port ${port}`)
})