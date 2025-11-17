async function deletee(data,{StudentRepository}) {
    let result = await StudentRepository.deletee(data)
    return result
}


module.exports = deletee