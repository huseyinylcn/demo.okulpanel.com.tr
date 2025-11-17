const TeacherEnity = require("./../../domain/teacher/teacherEnity")


async function create(data,{TeacherRepository}) {
    let  result = await new TeacherEnity(data)
    await TeacherRepository.Teachercreate(result)
    return true
    
}


module.exports = create