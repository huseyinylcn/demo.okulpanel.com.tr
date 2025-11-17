const admin = require("firebase-admin");

const fs = require("fs");
const logyaz = require("./../../utils/logSave")




let initFirebase = (serviceAccount) => {
    try {
         admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    } catch (error) {
        logyaz(error)
    }
   
}


// Tek bir token'a gönderim yapan fonksiyon
const sendNotification = async (registrationToken, title, body, data = {}) => {
    const message = {
        notification: { title, body },
        token: registrationToken,
        data
    };

    try {
        const response = await admin.messaging().send(message);
        console.log("Bildirim başarıyla gönderildi:", response);
        return response;
    } catch (error) {

        logyaz(error)
        console.error("Hata oluştu:", error);
       
    }
};



// Dışarıya fonksiyonu açıyoruz
module.exports = { sendNotification, initFirebase };

