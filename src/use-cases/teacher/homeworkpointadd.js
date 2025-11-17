async function homeworkpointadd(data,{TeacherRepository}) {
    let result = await TeacherRepository.homeworkpointadd(data)
    return result
}


module.exports = homeworkpointadd