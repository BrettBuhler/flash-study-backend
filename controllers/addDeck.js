const User = require('../models/userModel.js')

const addDeck = async (req, res) => {
    try {
        const {_id, name, cards} = req.body
        const user = await User.findById(_id)

        const existingDeck = user.decks.find((deck) => deck.name === name)
        if (existingDeck){
            return res.status(400).json({message: 'A deck with the same name already exists'})
        }

        const newDeck = {
            name,
            cards
        }

        user.decks.push(newDeck)

        await user.save()

        return res.status(201).json({ message: 'Deck added successfully', user: user})
    } catch (error) {
        console.error('Error adding deck:', error)
        return res.status(500).json({ message: 'Internal server error (add deck)'})
    }
}

module.exports = addDeck