async function lessondelete(data,{scheduleRepository}) {
    
    let result = await scheduleRepository.lessondelete(data)
    return result
}


module.exports = lessondelete