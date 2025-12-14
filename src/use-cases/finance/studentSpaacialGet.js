async function studentSpaacialGet(data,{financeRepository,helperFunc}) {

    let startDate = await  financeRepository.studentSpacialGet_StartDate(data)


    const tarih = new Date(startDate[0].baslangic_tarihi);
    const ayinGunu = tarih.getDate();
    startDate = ayinGunu -1

    data.startDate = startDate
    let result = await financeRepository.studentSpacialGet(data)

    return result
}


module.exports = studentSpaacialGet