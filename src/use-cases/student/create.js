const StudentEnity = require("./../../domain/student/studentEnity")

async function create(data,{StudentRepository}) {
  
    let result = await new StudentEnity(data)


   

   let resultDB =  await StudentRepository.studentCreate(result)


    if(data.OgrenciId){
        let res = await StudentRepository.UpdateStudentNumber(data)
    }

 
    return resultDB[0]
    
}

module.exports = create