

async function schedule(data,{TeacherRepository}) {
    let result = await TeacherRepository.scheduleGet(data)
    return result
}



module.exports = schedule