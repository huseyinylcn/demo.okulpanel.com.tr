async function point(data,{StudentRepository}) {
    let result = await StudentRepository.point(data)
    return result
}



module.exports = point