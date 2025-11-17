async function attendanceIdareRapor(data,{TeacherRepository}) {
    
    let result = await TeacherRepository.attendanceIdareRapor(data)
    return result

}




module.exports = attendanceIdareRapor