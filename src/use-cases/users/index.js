async function index(data,{userRepository}) {

    let result = await userRepository.index(data)
    return result
    
}


module.exports = index

