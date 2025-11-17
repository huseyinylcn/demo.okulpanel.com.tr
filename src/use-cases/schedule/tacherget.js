    const gunler = [
  "Pazar",
  "Pazartesi",
  "Salı",
  "Çarşamba",
  "Perşembe",
  "Cuma",
  "Cumartesi"
];

async function teacherGet(data,{scheduleRepository}) {
    
    const bugun = new Date();
    const gun = gunler[bugun.getDay()]; 
    data.gun = gun



    const yyyy = bugun.getFullYear();
    const mm = String(bugun.getMonth() + 1).padStart(2, '0'); // Ay 0-11 arası olduğu için +1
    const dd = String(bugun.getDate()).padStart(2, '0');

    data.tarih = `${yyyy}-${mm}-${dd}`;




    return await scheduleRepository.getTeacher(data)
}



module.exports = teacherGet