async function createAdmin(data,{userRepository}) {
    let result = await userRepository.createAdmin(data)
    return result
    
}



module.exports = createAdmin