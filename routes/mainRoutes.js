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

router.get('/add-deck', ensureAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'))
})

router.get('/add-deck/manual', ensureAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'))
})

router.get('/add-deck/ai', ensureAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'))
})

router.get('/add-deck/text', ensureAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'))
})

router.get('/edit-deck', ensureAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'))
})

router.get('/edit-deck/add/manual', ensureAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'))
})

router.get('/edit-deck/add/ai', ensureAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'))
})

router.get('/edit-deck/add/text', ensureAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'))
})

module.exports = router