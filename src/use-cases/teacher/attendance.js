async function attendance(data, { TeacherRepository }) {

    function getFormattedDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    data.Tarih = getFormattedDate();
    let result = await TeacherRepository.attendance(data)
    return result

}


module.exports = attendance