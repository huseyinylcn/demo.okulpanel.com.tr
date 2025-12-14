async function examPointAdd(data, { TeacherRepository }) {

    for (const obj of data.points) {
        try {

            await TeacherRepository.pointadd(obj)
            let result = await TeacherRepository.pointAddNotfication(data)

            for (const obj_notfication of result) {
                console.log(obj_notfication)
                try {
                    sendNotification(
                        obj_notfication.fcm_token,
                        `${obj_notfication.Ders} Sınav Sonuçları Açıklandı`,
                        `Sayın Velimiz, Velisi bulunduğunuz ${obj_notfication.AdSoyad}, ${obj_notfication.Ders} dersi sınavından ${obj.puan} puan almıştır.`,
                        { customKey: "customValue" }
                    );
                } catch (error) {
                    console.log(error)
                }

            }

        } catch (error) {
            // Burada Kayıt olmayan öğrencileri geri bildirim olarak öndermek gerek

        }

    }


    return true


}



module.exports = examPointAdd