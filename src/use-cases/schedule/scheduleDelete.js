



async function scheduleDelete(data,{scheduleRepository}) {
  let result = await scheduleRepository.scheduleDelete(data)
    return result
}


module.exports = scheduleDelete
