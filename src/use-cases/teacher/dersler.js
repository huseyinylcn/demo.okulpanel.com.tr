
async function dersler(data,{TeacherRepository,helperFunc}) {

    let Gun = await helperFunc.gunBul(data.tarih)
    data.Gun = Gun
    
    let result = await TeacherRepository.dersler(data)

    return result
    
}







module.exports = dersler