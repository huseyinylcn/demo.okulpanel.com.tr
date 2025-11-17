let verifyCode = false
let verifyStatus = false
let username = ''




async function passwordForget(data, { userRepository, verify }) {

    let result1 = await userRepository.passwordForget(data)
    if (result1.durum == 0) return "0x399"


    verifyCode = Math.floor(Math.random() * 900000) + 100000;
  

    await verify(result1.username, verifyCode)


    setTimeout(() => {
        verifyCode = false
 
    }, 120 * 1000);

    username = result1.username

    return true

}




async function passwordForgetCodeVerify(data, { userRepository }) {
    console.log(data, verifyCode)
    if (verifyCode == false) {
        verifyCode = false
        verifyStatus = false;
        username = ''
        return false
    }
    else {
        if (verifyCode == data.code) {
            verifyStatus = true
            return true


        }
        else {
            verifyCode = false
            verifyStatus = false;
            username = ''
            return false
        }
    }
}


async function paswordUpdate(data, { userRepository }) {
    if (verifyStatus) {
        data.username = username
        let result = await userRepository.passwordUpdate2(data)
            verifyCode = false
            verifyStatus = false;
            username = ''
        return result
    } else{
            verifyCode = false
            verifyStatus = false;
            username = ''
        return false
    } 

}





















// Student ----------------------------------------------------------------------------------------

async function passwordForgetSt(data, { userRepository, verifyTel }) {

    let result1 = await userRepository.passwordForgetSt(data)
    if (result1.Durum == 0) return "0x399"


    verifyCode = Math.floor(Math.random() * 900000) + 100000;
  

    await verifyTel(result1.Tel, verifyCode)


    setTimeout(() => {
        verifyCode = false
 
    }, 123 * 1000);

    username = data.no

    return true

}


async function passwordForgetCodeVerifyST(data, { userRepository }) {
    // console.log(data, verifyCode)
    if (verifyCode == false) {
        verifyCode = false
        verifyStatus = false;
        username = ''
        return false
    }
    else {
        if (verifyCode == data.code) {
            verifyStatus = true
            return true


        }
        else {
            verifyCode = false
            verifyStatus = false;
            username = ''
            return false
        }
    }
}

async function paswordUpdateST(data, { userRepository }) {
    console.log(data,username)
    if (verifyStatus) {
        data.username = username
        let result = await userRepository.passwordUpdate3(data)
            verifyCode = false
            verifyStatus = false;
            username = ''
        return result
    } else{
            verifyCode = false
            verifyStatus = false;
            username = ''
        return false
    } 

}


















module.exports = { passwordForget, passwordForgetCodeVerify,paswordUpdate,passwordForgetSt,passwordForgetCodeVerifyST,paswordUpdateST }