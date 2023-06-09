const express = require ('express')
const passport = require('passport')
const router = express.Router()
const createUser = require('../controllers/createUser.js')
const addDeck = require('../controllers/addDeck.js')
// POST /register
router.post('/register', createUser)

// POST /login
router.post('/login', async (req, res) => {
    try{
        res.status(200).json({
            timestamp: Date.now(),
            message: 'Logged in',
            code: 200
        })
    } catch (error) {
        throw new Error(error)
    }
})

//POST /logout
router.post('/logout', async(req, res) => {
    try{
        res.status(200).json({
            timestamp: Date.now(),
            message: 'Logged out',
            code: 200
        })
    } catch (error) {
        throw new Error(error)
    }
})

// Post /add
router.post('/add', addDeck)

router.all('*', async (req, res) => {
    try {

        res.status(404).json({
            timestamp: Date.now(),
            message: 'no route matches your request',
            code: 404,
        })

    } catch (err){
        throw new Error(err)
    }
})

module.exports = router