async function statisticsClassWeb(data,{trialRepository}) {
   
    let result = await trialRepository.statisticsClassWeb(data)



    
    return result
    
}


module.exports = statisticsClassWeb