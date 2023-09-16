require('dotenv').config() 
require('./db/db')
const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT

//middleware
app.use(express.json())
app.use(cors())

//endpoints
app.get('/', (req, res) => {
    res.send('Hello World!')
})

const usersDataRouter = require('./routers/useres')
app.use('/users', usersDataRouter)

//listener
try {
    app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
} catch (error) {
    console.log(error);
}