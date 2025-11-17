async function lessonAssignmentGet(data,{TeacherRepository}) {

    const today = new Date();

    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Aylar 0'dan başlar
    const dd = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${yyyy}-${mm}-${dd}`;
    
    data.tarih = formattedDate
    // console.log(data.tarih)
    let result = await TeacherRepository.lessonAssignmentGet(data)

    return result
    
}


module.exports = lessonAssignmentGet