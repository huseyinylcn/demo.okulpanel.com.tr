
async function allTeacherGet({TeacherRepository}) {
   let result  = await TeacherRepository.allTeacherGet()
   return result
    
}


module.exports = allTeacherGet