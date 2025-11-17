async function pointadd(data, { TeacherRepository, sendNotification }) {




    let result = await TeacherRepository.pointadd(data)


    let result1 = await TeacherRepository.pointAddNotfication(data)

    for (const obj of result1) {
        try {
           
            sendNotification(
                obj.fcm_token,
                `${obj.Ders} Sınav Sonuçları Açıklandı`,
                `Sayın Velimiz, Velisi bulunduğunuz ${obj.AdSoyad}, ${obj.Ders} dersi sınavından ${data.puan} puan almıştır.`,
                { customKey: "customValue" }
            );
        } catch (error) {
            console.log(error)
        }

    }

    return result
}


module.exports = pointadd