async function classGroupDelete(data,{scheduleRepository}) {
    let result = await scheduleRepository.classGroupDelete(data)
    return result
}

module.exports = classGroupDelete