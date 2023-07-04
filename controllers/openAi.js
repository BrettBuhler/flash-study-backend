const { Configuration, OpenAIApi} = require('openai')
const User = require('../models/userModel.js')
const textConfig3 = require('../config/textConfig3.js')
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
                prompt: `From the text I give you make my flash cards. Make as many flash cards as you can. Return them in the format [{question: "some question", answer: "some answer"}] This is the text: ${text}`,
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
    cardsFromTextFunction: async (req, res) => {
        try {
            console.log('cardsFromTextFunction')
            const {_id, text, cost} = req.body
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

            return res.status(200).json({message: 'success', cards: textConfig3(response.data.choices[0].message.content), user: user})

        } catch (error) {
            console.log(error)
            return res.status(500).json({message: 'Internal server error', error: error})
        }
    },
    cardsFromAi : async (req, res) => {
        try {
            console.log('cardsFromAi')
            const {_id, number, topic, subTopic} = req.body
            const user = await User.findById(_id)
            user.ai_tokens -= number * 20
            await user.save()

            const message = [
                {role: "system", content: 'You are an expert at making flash cards. You alway return flashcards in the form: [{"question": "some question", "answer": "some answer}]'},
                {role: 'user', content: 'Write me 2 flashcards about the topic: ancient greece. The flashcards should be about the sub-topic: Athens'},
                {role: "assistant", content: '[{"question": "What ancient Greek city-state was renowned for its naval power?", "answer": "Athens"},{"question": "What is Athens known for in ancient Greece?", "answer": "Contributions to philosophy, literature, and democracy"}]'},
                {role: "user", content: `Write me ${number} flashcards about the topic: ${topic}. The flashcards should be about the sub-topic: ${subTopic}`}
            ]

            

            const openai = new OpenAIApi(
                new Configuration({ apiKey: process.env.OPEN_AI_KEY })
            )

            const response = await openai.createChatCompletion({
                //note* change to gpt-3.5-turbo in August
                model: "gpt-3.5-turbo-0613",
                messages: message,
            })
            console.log(response.data)
            console.log(response.data.choices[0])
            return res.status(200).json({ message: 'success', cards: textConfig3(response.data.choices[0].message.content), user: user })

        } catch (error) {
            console.error(error)
            return res.status(500).json({message: "Internal server error", error: error})
        }

    },
    cardsFromAi2 : async (req, res) => {
        try {
            console.log('cardsFromAi2')
            const {_id, number, topic, subTopic} = req.body
            console.log(_id, number, topic,)
            const user = await User.findById(_id)
            user.ai_tokens -= number * 20
            await user.save()


            const openai = new OpenAIApi(
                new Configuration({ apiKey: process.env.OPEN_AI_KEY })
            )



            const response = await openai.createChatCompletion({
                //note* change to gpt-3.5-turbo in August
                "model": "gpt-3.5-turbo-0613",
                "messages": [
                    {
                        "role": "user",
                        "content": `Give me ${number} flashcards about the topic: ${topic} and the subtopic ${subTopic}`
                    },
                ],
                "functions": [
                    {
                        "name": `generate_n_flashcards`,
                        "description": `return an array of ${number} flash cards about the topic ${topic}, and about the sub topic ${subTopic}`,
                        "parameters": {
                            "topic": {
                                "type": "string",
                                "description": "the topic the flashcards should be about"
                            },
                            "subTopic": {
                                "type": "string",
                                "description": "the subtopic the flashcards should be about"
                            },
                            "number": {
                                "type": "integer",
                                "description": "The number of flashcards to return"
                            },
                            "required": ["topic", "subTopic", "number"]
                        },
                    }
                ]
            })

            return res.status(200).json({message: 'success', data: response.data})

        } catch (error) {
            console.error(error)
            return res.status(500).json({message: "Internal server error", error: error})
        }

    }
}