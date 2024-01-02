require('dotenv').config();
require('./db/db');


const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cors());
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

//chat
const chatRoute = require('./routes/chat')
app.use('/api/chat', chatRoute)

//message
const messageRoute = require('./routes/message')
app.use('/api/message', messageRoute)

//notify
const notifyRoute = require("./routes/notify")
app.use("/api/notification", notifyRoute)

//friend
const friendRoute = require("./routes/friend")
app.use("/api/friend", friendRoute)

//boardList
const listRoue = require("./routes/boardList")
app.use("/api/list", listRoue)




// Start the server
try {
  app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
  });
} catch (error) {
  console.error('Error starting server:', error);
}

//mongodb+srv://markushilgner:M7MLXwtKJpv9MJCG@ropdb.mzm4rni.mongodb.net/db?retryWrites=true&w=majority