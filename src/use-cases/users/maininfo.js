

async function maininfo(data,{userRepository}) {
    let result = await userRepository.maininfo(data)
    return result
    
}
module.exports = maininfo