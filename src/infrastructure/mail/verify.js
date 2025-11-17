const nodemailer = require("nodemailer")


async function mail_verify(mail,token) {

     let transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'verify@okulpanel.com',
                pass:'jxzgrmwtjahncplc'
            }
        })


        
        let mailOptions = {
            from:'verify@okulpanel.com',
            to:`${mail}`,
            subject:`Verification`,
            html:`<h3>Mail Adresinizi Doğrulayın</h3><p>Doğrulama Kodu:${token}</p>`
        }


    transporter.sendMail(mailOptions,(err,data)=>{
            if(err){
              throw new Error("email adresine doğrulama kodu gönderilemedi")
            }else{
        
                return true
            }
        })
    
}




module.exports = mail_verify