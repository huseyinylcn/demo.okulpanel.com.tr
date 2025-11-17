async function token(data,{userRepository}) {
    let result =  await userRepository.token(data)

    return result
    
}





module.exports = token