const express = require('express')
require('dotenv').config()
const connectDB = require('./controllers/connectDB')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const cors = require('cors')
const app = express()
const path = require('path')
const { ensureAuth } = require('./middleware/auth.js')

const APIRoutes = require('./routes/apiRoutes.js')
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


app.use(cors({
    origin: [frontEndURL]
}))


app.use('/api', APIRoutes)

app.use(express.static(path.join(__dirname, 'build')))


app.get('/', (req, res) => {
    if (req.isAuthenticated()){
        console.log('here')
        res.redirect('/dashboard')
    } else {
        res.sendFile(path.join(__dirname, 'build', 'index.html'))
    }
})

app.get('/dashboard', ensureAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})



try {
    app.listen(5000, ()=>{
        console.log('listening on port: 5000')
    })
} catch(error) {
    throw new Error(error)
}