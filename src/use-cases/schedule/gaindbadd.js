async function gaindbadd(data,{scheduleRepository}) {
    

    let result = scheduleRepository.gaindbadd(data)
    return result
}


module.exports = gaindbadd