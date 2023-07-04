const textConfig2 = (text) => {
    let left = -1
    let right = -1
    for (let i = 0; i < text.length; i++){
        if (text[i] == "["){
            left = i
            break
        }
    }
    for (let i = text.length - 1; i >= 0; i--){
        if (text[i] == "]"){
            right = i
            break
        }
    }
    if (right !== -1 && left !== -1){
        return JSON.parse(text.substring(left, right + 1))
    } else if (left !== -1){
        for (let i = text.length - 1; i >= 0; i--){
            if (text[i] == '}'){
                right = i
                break
            }
        }
        if (right !== -1){
            let newText = text.substring(left, right + 1)
            newText += ']'
            return JSON.parse(newText)
        } else {
            return 'error'
        }
    } else {
        return 'error'
    }
}

const textConfig3 = (string) => {
    if (string.includes('[') && string.includes(']')){
        return textConfig2(string)
    } else if (string.includes('{') && string.includes('}')){
        const cardArr = []
        while (string.includes('{') && string.includes('}')){
            let index0 = string.indexOf('{')
            let index1 = string.substring(index0).indexOf('}')
            if (index1 !== -1){
                cardArr.push(string.substring(index0, index0 + index1 + 1))
                string = string.substring(index0 + index1)
            } else {
                string = string.substring(index0)
            }
        }
        return cardArr.map(x=>JSON.parse(x))
    } else {
        return [{question: `Server Error: ${string}`, answer: 'Server Error'}]
    }
}

console.log(textConfig3('Here are 15 flashcards about the topic: science fiction (sf):\n' +
'\n' +
'1. {"question": "What is science fiction?", "answer": "A genre of speculative fiction that typically deals with imaginative and futuristic concepts."}\n' +
'2. {"question": "Who is considered the father of science fiction?", "answer": "H.G. Wells"}\n' +
'3. {"question": "What is a common theme in science fiction stories?", "answer": "Exploration of technological advancements and their impact on society"}\n' +
'4. {"question": "Which famous science fiction series features a conflict between the Force and the Dark Side?", "answer": "Star Wars"}\n' +
`5. {"question": "Who wrote the dystopian novel '1984'?", "answer": "George Orwell"}\n` +
`6. {"question": "In the 'Blade Runner' series, what are the genetically engineered human replicants called?", "answer": "Nexus-6 replicants"}\n` +
`7. {"question": "What is the title of Ray Bradbury's classic science fiction novel about book burning?", "answer": "Fahrenheit 451"}\n` +
`8. {"question": "Who is the author of 'The War of the Worlds'?", "answer": "H.G. Wells"}\n` +
'9. {"question": "What science fiction film franchise follows the adventures of the USS Enterprise?", "answer": "Star Trek"}\n' +    
`10. {"question": "What is the central concept in 'The Matrix' trilogy?", "answer": "A simulated reality known as the Matrix"}\n` +  
`11. {"question": "Who wrote the science fiction novel 'Dune'?", "answer": "Frank Herbert"}\n` +
`12. {"question": "What is the subject of Mary Shelley's novel 'Frankenstein'?", "answer": "Creating life through science and its consequences"}\n` +
`13. {"question": "In science fiction, what does the abbreviation 'AI' stand for?", "answer": "Artificial Intelligence"}\n` +        
`14. {"question": "Who wrote the 'Foundation' series, a milestone in science fiction literature?", "answer": "Isaac Asimov"}\n` +    
'15. {"question": "What is t'))


module.exports = textConfig3