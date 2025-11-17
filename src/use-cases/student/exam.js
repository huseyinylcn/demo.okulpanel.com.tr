async function exam(data,{StudentRepository}) {
    let result = await StudentRepository.exam(data)
    return result
    
}


module.exports = exam