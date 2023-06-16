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

module.exports = textConfig2