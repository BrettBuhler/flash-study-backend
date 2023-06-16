const { Configuration, OpenAIApi} = require('openai')
const User = require('../models/userModel.js')
const textConfig = require('../config/textCofig.js')
const textConfig2 = require('../config/textConfig2.js')
const axios = require('axios')

require('dotenv').config()

const client = axios.create({
    headers: {'Authorization': `Bearer ${process.env.OPEN_AI_KEY}`}
})

module.exports = {
    cardsFromText: async (req, res) => {
        try {
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
    },
    cardsFromTextFunction: async (rec, res) => {
        try {
            console.log('cardsFromTextFunction')
            const {_id, text, cost} = rec.body
            const user = await User.findById(_id)
            user.ai_tokens -= cost
            await user.save()

            const openai = new OpenAIApi(
                new Configuration({ apiKey: process.env.OPEN_AI_KEY })
            )

            const message = [
                {role: "system", content: 'You are an expert at removing facts from text. Return as many facts as you can. You alway return the facts in the form: [{"question": "some question", "answer": "some answer}]'},
                {role: 'user', content: 'The current height of the Eiffel Tower is 1083 feet, and the total width is 410 feet. Also, it took 2,500,000 rivits to construct.'},
                {role: "assistant", content: '[{"question": "What is the current height of the Eiffel Tower?", "answer": "The current height of the Eiffel Tower is 1083 feet"}, {"question": "How wide is the Eiffel Tower?", "answer": "410 feet"}, {"question": "How many rivits did it take to construct the Eiffel Tower?", "answer": "2,500,000"}]'},
                {role: 'user', content: text}
            ]
            //note* change to gpt-3.5-turbo in August
            let model = cost < 520 ? 'gpt-3.5-turbo-0613' : "gpt-3.5-turbo-16k-0613"

            const response = await openai.createChatCompletion({
                //note* change to gpt-3.5-turbo in August
                model: model,
                messages: message,
            })
            console.log(response.data.choices[0].message.content)

            return res.status(200).json({message: 'success', cards: textConfig2(response.data.choices[0].message.content), user: user})

        } catch (error) {
            console.log(error)
            return res.status(500).json({message: 'Internal server error', error: error})
        }
    }
}