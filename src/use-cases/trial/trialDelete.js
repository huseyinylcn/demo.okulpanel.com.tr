async function trialDelete(data,{trialRepository}) {
    let result = trialRepository.trialDelete(data)
    return result
    
}


module.exports = trialDelete