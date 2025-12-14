async function attendanceAddNew(data, { TeacherRepository, sendNotification }) {

function getFormattedDate() {
  const today = new Date();
  const year = today.getFullYear(); 
  const month = String(today.getMonth() + 1).padStart(2, '0'); 
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


    for (const obj of data.yoklama) {
        obj.tarih = getFormattedDate();

        let result = await TeacherRepository.attendanceadd(obj)
        if (obj.durum == 0) {
            try {
                let res = await TeacherRepository.attendanceNatfication(obj)
                res.forEach(element => {
                    sendNotification(
                        element.fcm_token,
                        "Devamsızlık Bilgisi",
                        `${element.AdSoyad} ${element.DersSaati} saatinde ki ${element.Ders} dersine katılmamıştır.`,
                        { customKey: "customValue" }
                    );

                });

                
            } catch (error) {
                return true
                // bildirim gitmediğini logla daha sonra tekrar göndermeyi dene

            }


        }


    }






    return true
}


module.exports = attendanceAddNew







