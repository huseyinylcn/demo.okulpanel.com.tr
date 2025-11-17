

async function classGroup(data,{scheduleRepository}) {

    let result = await scheduleRepository.classGroup(data)

    return result
}


module.exports = classGroup