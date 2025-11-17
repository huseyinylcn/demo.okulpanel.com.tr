async function responseKeyGet(data,{trialRepository}) {

    let result = await trialRepository.responseKeyGet(data)

    return result
    
}



module.exports = responseKeyGet