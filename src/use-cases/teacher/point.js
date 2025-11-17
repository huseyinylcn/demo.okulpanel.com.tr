


async function point(data,{TeacherRepository}) {
    let result = await TeacherRepository.point(data)
    return result
}








module.exports = point