const StudentEnity = require("./../../domain/student/studentEnity")

async function create(data,{StudentRepository}) {
  
    let result = await new StudentEnity(data)
    
    await StudentRepository.studentCreate(data)

 
    return result
    
}

module.exports = create