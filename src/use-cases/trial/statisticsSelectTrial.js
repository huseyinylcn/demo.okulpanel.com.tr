async function statisticsSelectTrial(data,{trialRepository}) {
    let mtn = ''
    for(let i of data.id){
        mtn += `${i},`
    }
    data.id = mtn.slice(0,-1)
    let result = await trialRepository.statisticsSelectTrial(data)




    
    return result
}

module.exports = statisticsSelectTrial