async function examget(data,{TeacherRepository}) {
    let result = await TeacherRepository.examget(data)
    return result
}

module.exports = examget