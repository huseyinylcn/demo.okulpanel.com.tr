async function courseStudentget(data,{scheduleRepository}) {
    let result  = await scheduleRepository.courseStudentget(data)
    return result
}

module.exports = courseStudentget