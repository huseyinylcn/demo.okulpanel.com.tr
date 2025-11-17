



async function getclass(data,{scheduleRepository}) {
    let result =  await scheduleRepository.getclass(data)
    return result
}


module.exports = getclass