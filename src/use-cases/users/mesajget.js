async function mesajget(data,{userRepository}) {
    let result = await userRepository.mesajget(data)
    return result
    
}

module.exports = mesajget