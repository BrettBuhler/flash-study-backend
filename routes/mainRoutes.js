const express = require ('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth.js')
const { dashAuth } = require('../middleware/dashAuth.js')
const path = require('path')

//router.use(express.static(path.join(__dirname, '../public')))

router.get('/', dashAuth,  (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

router.get('/dashboard', ensureAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

router.get('/add-deck', ensureAuth, (req, res) => {
    return res.redirect('/dashboard')
})

router.get('/add-deck/manual', ensureAuth, (req, res) => {
    return res.redirect('/dashboard')
})

router.get('/add-deck/ai', ensureAuth, (req, res) => {
    return res.redirect('/dashboard')
})

router.get('/add-deck/text', ensureAuth, (req, res) => {
    return res.redirect('/dashboard')
})

router.get('/edit-decks', ensureAuth, (req, res) => {
    return res.redirect('/dashboard')
})

router.get('/edit-deck/add/manual', ensureAuth, (req, res) => {
    return res.redirect('/dashboard')
})

router.get('/edit-deck/add/ai', ensureAuth, (req, res) => {
    return res.redirect('/dashboard')
})

router.get('/edit-deck/add/text', ensureAuth, (req, res) => {
    return res.redirect('/dashboard')
})

router.get('/store', ensureAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

router.get('/help', ensureAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

router.get('/stats', ensureAuth, (req, res) => {
    return res.redirect('/dashboard')
})

router.get('/study', ensureAuth, (req, res) => {
    return res.redirect('/dashboard')
})

router.get('/store/buytokens', ensureAuth, (req, res) => {
    return res.redirect('/dashboard')
})

router.get('/dashboard/complete', ensureAuth, (req, res) => {
    // Redirect to a different URL
    res.redirect('/dashboard');
})

module.exports = router