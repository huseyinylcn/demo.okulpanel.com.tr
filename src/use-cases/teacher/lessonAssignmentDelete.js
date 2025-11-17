async function lessonAssignmentDelete(data,{TeacherRepository}) {
    
    let result = await TeacherRepository.lessonAssignmentDelete(data)
    return result
}



module.exports = lessonAssignmentDelete