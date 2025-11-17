async function classGroupAdd(data,{scheduleRepository}) {
    let result = await scheduleRepository.classGroupAdd(data)
    return result
}

module.exports = classGroupAdd