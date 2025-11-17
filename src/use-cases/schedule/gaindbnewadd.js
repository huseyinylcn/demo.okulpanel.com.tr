async function gaindbnewadd(data,{scheduleRepository}) {
    

    let result =  await scheduleRepository.gaindbnewadd(data)

    return result
}



module.exports = gaindbnewadd