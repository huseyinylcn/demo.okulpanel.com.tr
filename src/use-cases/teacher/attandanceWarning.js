


async function attandanceWarning(data, { TeacherRepository, sendNotification }) {


    const date = new Date();

 
    const formattedDate = date.toISOString().split('T')[0];

    const days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
    const dayName = days[date.getDay()];



    data.tarih = formattedDate;
    data.Gun = dayName;

    let result = await TeacherRepository.attandanceWarning(data)



    for(const obj of result){
        try {
            // console.log(obj)
             sendNotification(
                    obj.fcm_token,
                    "Yoklama Uyarı",
                    `Kıymetli Öğretmenimiz, ${obj.DersSaati} saatleri arasındaki ${obj.Ders} dersinin yoklaması henüz tamamlanmamıştır. Lütfen sistem üzerinden yoklama girişini gerçekleştiriniz.`,
                    { customKey: "customValue" }
                );
        } catch (error) {
            console.log(error)
        }
         
    }
 return true

}

module.exports = attandanceWarning