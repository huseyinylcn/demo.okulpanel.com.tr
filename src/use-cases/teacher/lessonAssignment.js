async function lessonAssignment(data, { TeacherRepository, sendNotification }) {

    let result = await TeacherRepository.lessonAssignment(data)

    let result2 =await TeacherRepository.lessonAssignmentNotfication(data)


    for (const obj of result2) {
        try {

            sendNotification(
                obj.fcm_token,
                `Ders Ataması`,
                `Kıymetli Öğretmenimiz, ${obj.Gun} günü ${obj.Sinif} sınıfında ${obj.DersSaati} saatindeki ${obj.Ders} dersi size atanmıştır.`,
                { customKey: "customValue" }
            );
        } catch (error) {
            console.log(error)
        }

    }




    return result
}



module.exports = lessonAssignment