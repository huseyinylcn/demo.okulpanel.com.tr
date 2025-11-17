const accountSid = 'AC534c4e022cb8e47e9d36c03cba74ab43';
const authToken = '580860b325c4521b15d79f6b47f0076c';
const client = require('twilio')(accountSid, authToken);



async function verify(tel,code) {

    client.messages
    .create({
        body: `Doğrulama Kodunuz: ${code}`,
        from: '+12189755982',
        to: `+9${tel}`

    })
    .then(message => console.log(message.sid));


}

module.exports = verify
