async function spacialLessonDelete(data,{financeRepository,helperFunc}) {

    let result = await financeRepository.spacialLessonDelete(data)
    return result
    
}



module.exports = spacialLessonDelete