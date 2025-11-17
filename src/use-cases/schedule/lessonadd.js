

async function lessanadd(data,{scheduleRepository}) {
    let result = await scheduleRepository.lessonadd(data)
    return result

}



module.exports = lessanadd