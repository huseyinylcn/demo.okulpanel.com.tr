async function passwordUpdateAdmin(data,{userRepository}) {


    let result = await userRepository.passwordUpdateAdmin(data)
    return result
}



module.exports = passwordUpdateAdmin


