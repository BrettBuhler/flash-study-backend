const User = require('../models/userModel.js')

const CreateUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const newUser = new User({ email, password })
        await newUser.save()

        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({ error: 'Internal server error'})
    }
}

module.exports = CreateUser