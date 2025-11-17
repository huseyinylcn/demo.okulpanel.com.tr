

async function courseStudentAdd(data,{scheduleRepository}) {
    let result = await scheduleRepository.courseStudentAdd(data)

    return result
}



module.exports = courseStudentAdd