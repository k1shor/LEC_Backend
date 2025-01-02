const express = require('express')
require('dotenv').config()
require('./database/connection')

const TestRoute = require('./routes/testRoute')
const CategoryRoutes = require('./routes/categoryRoutes')

const app = express()
const port = process.env.PORT

app.use(express.json())

app.use('/api', TestRoute)
app.use('/api',CategoryRoutes)


app.listen(port, ()=>{
    console.log(`Server started successfully at port ${port}`)
})