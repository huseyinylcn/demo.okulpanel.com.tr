


async function allGet({StudentRepository}) {
    let result = await StudentRepository.studentGetAll()
    return result
    
}


module.exports = allGet