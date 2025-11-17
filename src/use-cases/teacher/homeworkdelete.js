async function homeworkdelete(data,{TeacherRepository}) {
    let result = await TeacherRepository.homeworkdelete(data)
    return result
}


module.exports = homeworkdelete