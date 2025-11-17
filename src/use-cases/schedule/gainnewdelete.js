async function gainnewdelete(data,{scheduleRepository}) {
    console.log(data)
    let result = await scheduleRepository.gainnewdelete(data)
    return result
    
}

module.exports = gainnewdelete