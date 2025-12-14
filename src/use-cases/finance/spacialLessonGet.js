async function spacialLessonGet(data,{financeRepository,helperFunc}) {

    let result = await financeRepository.spacialLessonGet(data)
    return result
    
}


module.exports = spacialLessonGet