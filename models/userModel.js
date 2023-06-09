const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    ai_tokens: {
        type: Number,
        default: 0,
    },
    decks: [{
        name: {
            type: String,
            required: true,
        },
        cards: [{
            question: {
                type: String,
                required: true,
            },
            answer:{
                type: String,
                required: true,
            },
            tries: {
                type: [Number],
                required: true
            },
            lastTry: {
                type: Date,
                required: true,
            }
        }]
    }]
})

const User = mongoose.model('User', userSchema)

module.exports = User