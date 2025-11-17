async function mesaj(data, { userRepository, sendNotification }) {

    let result = await userRepository.mesaj(data)

    if (data.aliciTipi == 'teacher' && data.gonderenTipi == "student") {
        let res = await userRepository.mesaj1(data)
        res.forEach(element => {
            sendNotification(
                element.fcm_token,
                "Mesaj",
                `${element.Sinif} Sınıfından ${element.OgrenciNumara} numaralı ${element.AdSoyad} size mesaj gönderdi`,
                {
                    customKey: "customValue",
                    page: "inbox",
                    click_action: "FLUTTER_NOTIFICATION_CLICK"
                }
            );
            console.log(element)
        });

    } else if (data.aliciTipi == 'student' && data.gonderenTipi == 'teacher') {

        let res = await userRepository.mesaj2(data)
        res.forEach(element => {
            sendNotification(
                element.fcm_token,
                "Mesaj",
                `${element.AdSoyad} isimli öğretmen size mesaj yolladı`,
                {
                    customKey: "customValue",
                    page: "inbox",
                    click_action: "FLUTTER_NOTIFICATION_CLICK" // Bu önemli!
                }
            );
            console.log(element)
        });



    } else if (data.aliciTipi == 'Sinif' && data.gonderenTipi == 'teacher') {




        
        let res = await userRepository.mesaj3(data)

        res.forEach(element => {
            sendNotification(
                element.fcm_token,
                "Mesaj",
                `${element.AdSoyad} isimli öğretmen size mesaj yolladı`,
                {
                    customKey: "customValue",
                    page: "inbox",
                    click_action: "FLUTTER_NOTIFICATION_CLICK" // Bu önemli!
                }
            );

            console.log(element)
        });


    } else if (data.aliciTipi == 'allteacher' && data.gonderenTipi == 'admin') {


        let res = await userRepository.mesaj4(data)

        res.forEach(element => {
            sendNotification(
                element.fcm_token,
                "Mesaj",
                `Okul Yönetmi öğretmenlere bir mesaj gönderdi`,
                {
                    customKey: "customValue",
                    page: "inbox",
                    click_action: "FLUTTER_NOTIFICATION_CLICK" // Bu önemli!
                }
            );
            console.log(element)
        });

    } else if (data.aliciTipi == 'allstudent' && data.gonderenTipi == 'admin') {


        let res = await userRepository.mesaj5(data)

        res.forEach(element => {
            try {
                sendNotification(
                    element.fcm_token,
                    "Mesaj",
                    `Okul Yönetmi öğrencilere bir mesaj gönderdi`,
                    {
                        customKey: "customValue",
                        page: "inbox",
                        click_action: "FLUTTER_NOTIFICATION_CLICK" // Bu önemli!
                    }
                )
            } catch (error) {
                console.log("hata var uan hata", error)
            }

            console.log(element)
        });

    }
    else if (data.aliciTipi == 'Sinif' && data.gonderenTipi == 'admin') {


        let res = await userRepository.mesaj6(data)

        res.forEach(element => {
            sendNotification(
                element.fcm_token,
                "Mesaj",
                `Okul Yönetmi ${data.AliciID} öğrencilerine bir mesaj gönderdi`,
                {
                    customKey: "customValue",
                    page: "inbox",
                    click_action: "FLUTTER_NOTIFICATION_CLICK" // Bu önemli!
                }
            );
            console.log(element)
        });

    } else if (data.aliciTipi == 'admin' && data.gonderenTipi == 'student') {


        let res = await userRepository.mesaj7(data)
        console.log(res)
        res.forEach(element => {
            sendNotification(
                element.fcm_token,
                "Mesaj",
                `${element.Sinif} sınıfından ${element.OgrenciNumara} numaralı ${element.AdSoyad} isimli öğrenci size mesaj gönderdi`,
                {
                    customKey: "customValue",
                    page: "inbox",
                    click_action: "FLUTTER_NOTIFICATION_CLICK" // Bu önemli!
                }
            );
            console.log(element)
        });

    } else if (data.aliciTipi == 'student' && data.gonderenTipi == 'admin') {


        let res = await userRepository.mesaj1(data)

        res.forEach(element => {
            sendNotification(
                element.fcm_token,
                "Mesaj",
                `Okul Yönetimi size mesaj gönderdi`,
                {
                    customKey: "customValue",
                    page: "inbox",
                    click_action: "FLUTTER_NOTIFICATION_CLICK" // Bu önemli!
                }
            );
            console.log(element)
        });

    }

    else if (data.aliciTipi == 'teacher' && data.gonderenTipi == 'admin') {


        let res = await userRepository.mesaj1(data)

        res.forEach(element => {
            sendNotification(
                element.fcm_token,
                "Mesaj",
                `Okul Yönetimi size mesaj gönderdi`,
                {
                    customKey: "customValue",
                    page: "inbox",
                    click_action: "FLUTTER_NOTIFICATION_CLICK" // Bu önemli!
                }
            );
            console.log(element)
        });

    }

    return result

}


module.exports = mesaj