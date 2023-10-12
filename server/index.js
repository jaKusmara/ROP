require('dotenv').config() 
require('./db/db')

const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT

//middleware
app.use(express.json())
app.use(cors())

//routes

//user
const userRoutes = require('./routes/user')
app.use('/api/user', userRoutes)

//search
const searchRoute = require('./routes/search');
app.use('/api/search', searchRoute);

//project
const projectRoute = require('./routes/project')
app.use('/api/project', projectRoute)

//task
const taskRoute = require('./routes/task')
app.use('/api/task', taskRoute)

//channel
const channelRoute = require('./routes/channel')
app.use('/api/channel', channelRoute)

const chatRoute = require('./routes/chat')
app.use('/api/chat', chatRoute)

const messageRoute = require('./routes/message')
app.use('/api/message', messageRoute)

//listener
try {
    app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
} catch (error) {
    console.log(error);
}