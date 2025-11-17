async function attendanceAddNew(data, { TeacherRepository, sendNotification }) {

    for (const obj of data.yoklama) {
        console.log(obj)

        let result = await TeacherRepository.attendanceadd(obj)
        if (obj.durum == 0) {
            try {
                let res = await TeacherRepository.attendanceNatfication(obj)
                res.forEach(element => {
                    sendNotification(
                        element.fcm_token,
                        "Devamsızlık Bilgisi",
                        `${element.AdSoyad} ${data.tarih} ${element.DersSaati} tarihinde ki ${element.Ders} dersine katılmamıştır.`,
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







