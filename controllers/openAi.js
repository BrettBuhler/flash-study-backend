const { Configuration, OpenAIApi} = require('openai')
const User = require('../models/userModel.js')
const textConfig = require('../config/textCofig.js')
require('dotenv').config()

module.exports = {
    cardsFromText: async (req, res) => {
        try {
            console.log(process.env.OPEN_AI_KEY)
            const {_id, text, cost} = req.body
            const user = await User.findById(_id)
            user.ai_tokens -= cost
            await user.save()

            const configuration = new Configuration({
                apiKey: process.env.OPEN_AI_KEY,
                headers: {
                    Authorization: `Bearer ${process.env.OPEN_AI_KEY}`
                }
            })
            const openai = new OpenAIApi(configuration)
            const open_ai_response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: `From the text I give you make my flash cards. Return them in the format [{question: "some question", answer: "some answer"}] This is the text: ${text}`,
                temperature: 0.4,
                max_tokens: 3500,
                top_p: 1.0,
                frequency_penalty: 1.5,
                presence_penalty: 0.0,
            })

            const formatedCards = textConfig(open_ai_response.data.choices[0].text)

            return res.status(200).json({message: 'Created cards', cards: formatedCards, user: user, data: open_ai_response.data})

        } catch (error){
            return res.status(500).json({message: 'internal server error', error: error})
        }
    } 
}