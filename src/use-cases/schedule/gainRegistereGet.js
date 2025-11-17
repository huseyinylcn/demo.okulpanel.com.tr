async function gainRegisteredGet(data,{scheduleRepository}) {
    let result = await scheduleRepository.gainRegisteredGet(data)
    return result
}


module.exports = gainRegisteredGet