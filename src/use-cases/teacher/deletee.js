
async function deletee(data,{TeacherRepository}) {
    let result = await TeacherRepository.deletee(data)
    return result
    
}


module.exports = deletee









