async function classdeletee(data, { TeacherRepository }) {
    let result = await TeacherRepository.classdeletee(data)
    return result
}



module.exports = classdeletee