

async function studentTrialGetOne(data,{trialRepository}) {
   
    let result = await trialRepository.studentTrialGetOne(data)

    result.FinalJson = JSON.parse(result.FinalJson)

    return result
}


module.exports = studentTrialGetOne