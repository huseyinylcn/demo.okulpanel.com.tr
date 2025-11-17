async function schools(data,{scheduleRepository}) {
    let result = await scheduleRepository.schools(data)
    return result
}




module.exports = schools