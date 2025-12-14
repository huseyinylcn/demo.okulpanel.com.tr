let dbUpdate = []




let timer;



function calistir(TeacherRepository) {

     let sqlQuery = `DELETE FROM yoklama
        WHERE ProgramID = @ProgramID
        AND tarih = @tarih`;

  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    
    
    dbUpdate.forEach(element=>{
        sqlQuery += ` and OgrenciID != ${element.OgrenciID}`

    })
    TeacherRepository.yoklamaUpdate(sqlQuery,dbUpdate[0])

    dbUpdate = []
  }, 3000);
}



async function attendanceadd(data, { TeacherRepository, sendNotification }) {


     dbUpdate.push(data)
    calistir(TeacherRepository)



    let result = await TeacherRepository.attendanceadd(data)




    if (data.durum == 0) {
        try {
            let res = await TeacherRepository.attendanceNatfication(data)
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




    return result
}


module.exports = attendanceadd







