async function tokendelete(data,{userRepository}) {
    let result = await userRepository.tokendelete(data)
    return result
    
}

module.exports = tokendelete