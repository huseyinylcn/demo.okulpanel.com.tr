const classEnity = require("./../../domain/student/classEnity")


async function classAdd(data,{StudentRepository}) {
     data =await new classEnity(data)
     let result = await StudentRepository.classAdd(data)
     return result

}

module.exports = classAdd