const express = require ('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth.js')
const path = require('path')

router.use(express.static(path.join(__dirname, '../build')))

router.get('/', (req, res) => {
    if (req.isAuthenticated()){
        console.log('here')
        res.redirect('/dashboard')
    } else {
        res.sendFile(path.join(__dirname, '../build', 'index.html'))
    }
})

router.get('/dashboard', ensureAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'))
})

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'))
})

router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'))
})

module.exports = router