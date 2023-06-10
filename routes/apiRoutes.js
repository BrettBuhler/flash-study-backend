const express = require ('express')
const router = express.Router()
const userController = require('../controllers/user.js')
const passport = require('passport')
// POST /register
router.post('/register', userController.createUser)

// POST /login
router.post('/login', userController.login)

//POST /logout
router.get('/logout', userController.logout)

// Post /add
router.post('/add', userController.addDeck)

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