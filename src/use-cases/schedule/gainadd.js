async function gainadd(data,{scheduleRepository}) {
    let result = await scheduleRepository.gainadd(data)
    return result
}


module.exports = gainadd