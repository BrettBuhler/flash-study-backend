const express = require ('express')
const router = express.Router()
const userController = require('../controllers/user.js')
const openAiController = require('../controllers/openAi.js')

// POST /register
router.post('/register', userController.createUser)
// POST /login
router.post('/login', userController.login)
//POST /logout
router.get('/logout', userController.logout)
// Post /add
router.post('/add', userController.addDeck)
// post /getauth
router.post('/getauth', userController.getAuthenticated)
// delete /deletedeck
router.delete('/deletedeck', userController.deleteDeck)
// put /addcards
router.put('/addcards', userController.addCards)
// put /updatedeck
router.put('/updatedeck', userController.updateDeck)
// post /cardsfromtext
router.post('/cardsfromtext', openAiController.cardsFromText)
// post /cardsfromtextfunction
router.post('/cardsfromtextfunction', openAiController.cardsFromTextFunction)
// post /cardsfromai
router.post('/cardsfromai', openAiController.cardsFromAi)
router.post('/cardsfromai2', openAiController.cardsFromAi2)
// post /addtokens
router.post('/addtokens', userController.addTokens)
// post /getuserbyid
router.post('/getuserbyid', userController.getuserbyid)


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