



async function classGet({StudentRepository}) {
   let result = await StudentRepository.classGet()
   return result
}

module.exports = classGet