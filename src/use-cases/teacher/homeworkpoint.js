async function homeworkpoint(data,{TeacherRepository}) {

    let result = await TeacherRepository.homeworkpoint(data)
    return result
    
}



module.exports = homeworkpoint