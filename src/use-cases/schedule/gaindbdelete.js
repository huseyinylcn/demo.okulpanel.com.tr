async function gaindbdelete(data,{scheduleRepository}) {
    let result = await scheduleRepository.gaindbdelete(data)
    return result
    
}


module.exports = gaindbdelete