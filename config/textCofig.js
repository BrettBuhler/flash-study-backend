const textConfig = (text) => {
  console.log('textConfig param:', text)
  if (text === undefined){
    return ''
  }
  let leftBrace = -1;
  let rightBrace = -1;
  let arrString = '';

  for (let i = 0; i < text.length; i++) {
    if (text[i] === '[') {
      leftBrace = i;
      break;
    }
  }

  for (let i = text.length - 1; i >= 0; i--) {
    if (text[i] === ']') {
      rightBrace = i;
      break;
    }
  }

  if (rightBrace > -1 && leftBrace > -1) {
    arrString = text.substring(leftBrace, rightBrace + 1);
  } else if (leftBrace > -1) {
    for (let i = text.length - 1; i >= 0; i--) {
      if (text[i] === '}') {
        rightBrace = i;
        break;
      }
    }

    if (rightBrace > -1) {
      arrString = text.substring(leftBrace, rightBrace + 1);
      arrString += ']';
    }
  }

  if (arrString.length > 0) {
    const jsonString = arrString.replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');

    try {
      const jsonObject = JSON.parse(jsonString);
      return jsonObject;
    } catch (error) {
      return error;
    }
  } else {
    return '';
  }
};

module.exports = textConfig

