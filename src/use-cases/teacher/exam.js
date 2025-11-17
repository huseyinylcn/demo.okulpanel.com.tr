async function exam(data,{TeacherRepository,sendNotification}) {
    let result = await TeacherRepository.exam(data)


    let result2 = await TeacherRepository.homeworkNotfication2(data)

    for(const obj of result2){

                try {
            // console.log(obj)
             sendNotification(
                    obj.fcm_token,
                     `${data.Ders} Sınav Tarihleri Açıklandı.`,
                    `Kıymetli Velimiz, ${data.Ders} sınavı tarihleri belli oldu.`,
                    { customKey: "customValue" }
                );
        } catch (error) {
            console.log(error)
        }
    }

    

    return result
}


module.exports = exam