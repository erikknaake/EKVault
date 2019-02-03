function getAllowedChars(capitalsAllowed, nonCapitalsAllowed, numericAllowed, specialAllowed) {
    allowedChars = "";
    if(capitalsAllowed)
        allowedChars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(nonCapitalsAllowed)
        allowedChars += "abcdefghijklmnopqrstuvwxyz";
    if(numericAllowed)
        allowedChars += '0123456789';
    if(specialAllowed)
        allowedChars += "-_+=!@#$%^&*(),./?";
    if(allowedChars.length === 0)
        throw "No valid characters";
    return allowedChars;
}

function generatePassword(length, capitalsAllowed, nonCapitalsAllowed, numericAllowed, specialAllowed) {
    allowedChars = getAllowedChars(capitalsAllowed, nonCapitalsAllowed, numericAllowed, specialAllowed);
    result = '';
    randomIndecis = new Uint32Array(length);
    window.Crypto.getRandomValues(randomIndecis);
    for(i = 0; i < length; i++)
        result += allowedChars.charAt(randomIndecis[i])
    return result;
}