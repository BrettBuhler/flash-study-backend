const express = require('express')
require('dotenv').config()
const connectDB = require('./controllers/connectDB')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')
const app = express()
app.use(express.static('public'))
const APIRoutes = require('./routes/apiRoutes.js')
const MAINRoutes = require('./routes/mainRoutes.js')
const STRIPERoutes = require('./routes/stripeRoutes.js')
const User = require('./models/userModel.js')
const frontEndURL = process.env.FRONT_END_URL || 'http://localhost:3000'

app.use(
    session({
        secret: process.env.PASSPORT_SECRET,
        resave: false,
        saveUninitialized: false,
    })
)
require('./config/passportConfig')(app)


app.use(bodyParser.json())

connectDB()

//cors for testing from front-end
app.use(cors({
    origin: [frontEndURL]
}))

app.use('/api', APIRoutes)
app.use(STRIPERoutes)
app.use(MAINRoutes)

const port = process.env.PORT || 5000
try {
    app.listen(port, ()=>{
        console.log('listening on port:', port)
    })
} catch(error) {
    throw new Error(error)
}