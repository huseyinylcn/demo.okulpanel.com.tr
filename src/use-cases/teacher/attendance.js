async function attendance(data,{TeacherRepository}) {
    let result = await TeacherRepository.attendance(data)
    return result
    
}


module.exports = attendance