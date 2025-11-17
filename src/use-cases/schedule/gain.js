



async function gain(data,{scheduleRepository}) {
    let result =  await scheduleRepository.gain(data)
    return result
}


module.exports = gain