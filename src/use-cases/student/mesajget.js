async function mesajget(data,{StudentRepository}) {
    let result = await StudentRepository.mesajget(data)
    return result
}


module.exports = mesajget