async function trialGet(data,{trialRepository}) {
    let result = await trialRepository.trialGet(data)
    return result
    
}

module.exports = trialGet