async function courseStudentDelete(data,{scheduleRepository}) {
    let result = await scheduleRepository.courseStudentDelete(data)
    return result


    
}


module.exports = courseStudentDelete