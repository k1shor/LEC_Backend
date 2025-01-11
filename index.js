const express = require('express')
require('dotenv').config()
require('./database/connection')

const cors = require('cors')


const TestRoute = require('./routes/testRoute')
const CategoryRoutes = require('./routes/categoryRoutes')
const ProductRoutes = require('./routes/productRoute')
const UserRoutes = require('./routes/userRoutes')
const OrderRoutes = require('./routes/orderRoute')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(cors())

app.use('/api', TestRoute)
app.use('/api',CategoryRoutes)
app.use('/api', ProductRoutes)
app.use('/api', UserRoutes)
app.use('/api', OrderRoutes)

app.use('/public/uploads', express.static('public/uploads'))


app.listen(port, ()=>{
    console.log(`Server started successfully at port ${port}`)
})