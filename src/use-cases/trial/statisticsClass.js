async function statisticsClass(data,{trialRepository}) {
   
    let result = await trialRepository.statisticsClass(data)



    
    return result
    
}


module.exports = statisticsClass