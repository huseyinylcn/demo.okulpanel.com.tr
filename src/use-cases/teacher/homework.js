const logyaz = require("./../../utils/logSave")


async function homework(data, { TeacherRepository, userRepository, sendNotification }) {

    if (data.KayitTuru == 0) {


        try {
            let res = await TeacherRepository.homeworkNotfication2(data)


            res.forEach(element => {
                sendNotification(
                    element.fcm_token,
                    "Ödev Bildirimi",
                    `${element.OgretmenAdi} isimli öğretmeniniz size ödev verdi`,
                    {
                        customKey: "inwork",
                        page: "inwork",
                        click_action: "FLUTTER_NOTIFICATION_CLICK" // Bu önemli!
                    }
                );

            });

        } catch (error) {
                console.log("hhh",error)
        }



    } else {


        try {
            data.OgrenciNumara = Number(data.OgrenciNumara)

            let res = await TeacherRepository.homeworkNotfication(data)



            res.forEach(element => {

                sendNotification(
                    element.fcm_token,
                    "Ödev Bildirimi",
                    `${element.OgretmenAdi} isimli öğretmeniniz size ödev verdi`,
                    {
                        customKey: "inwork",
                        page: "inwork",
                        click_action: "FLUTTER_NOTIFICATION_CLICK" // Bu önemli!
                    }
                );
            });
        } catch (error) {
            console.log("hhh",error)
        }

    }



    let result = await TeacherRepository.homework(data)
    return result
}


module.exports = homework