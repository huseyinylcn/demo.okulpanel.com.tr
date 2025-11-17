async function passwordUpdate(data,{userRepository}) {

    let result = await userRepository.passwordUpdate(data)
    console.log(data)
    return result
}

module.exports = passwordUpdate