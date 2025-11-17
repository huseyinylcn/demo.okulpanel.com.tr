async function examdelete(data,{TeacherRepository}) {
    let result = await TeacherRepository.examdelete(data)
    return result
}


module.exports = examdelete