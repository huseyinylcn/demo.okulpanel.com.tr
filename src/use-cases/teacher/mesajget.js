async function mesajget(data,{TeacherRepository}) {

    let result = await TeacherRepository.mesajget(data)
    return result
    
}


module.exports = mesajget