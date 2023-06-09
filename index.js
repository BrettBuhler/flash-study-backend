const express = require('express')
require('dotenv').config()
const connectDB = require('./controllers/connectDB')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const cors = require('cors')
const app = express()
const crypto = require('crypto')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')
const APIRoutes = require('./routes/apiRoutes.js')

const frontEndURL = process.env.FRONT_END_URL || 'http://localhost:3000'

connectDB()

app.use(cors({
    origin: [frontEndURL]
}))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(
    session({
        secret: process.env.PASSPORT_SECRET,
        resave: true,
        saveUninitialized: true,
    })
)

app.use(passport.initialize())
app.use(passport.session())

app.use('/api', APIRoutes)

passport.use(
    new LocalStrategy((username, password, done) => {
        if (username === 'ham' && password === 'cheese'){

        }
    })
)

app.use('/', async (req, res) => {
    res.json({
        code: 200,
        message: 'Success'
    })
})


try {
    app.listen(5000, ()=>{
        console.log('listening on port: 5000')
    })
} catch(error) {
    throw new Error(error)
}