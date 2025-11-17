async function dersler(data,{scheduleRepository}) {
    
    let result = await scheduleRepository.dersler(data)

    return result
}




module.exports = dersler 