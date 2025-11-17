async function birthdateCelebrate(data,{userRepository,sendNotification}) {
    let result = await userRepository.birthdateCelebrate(data)
    for(const obj of result){

                try {
            // console.log(obj)
             sendNotification(
                    obj.fcm_token,
                     `Doğum Günün Kutlu Olsun🥳`,
                    `${obj.msj}`,
                    { customKey: "customValue" }
                );
        } catch (error) {
            console.log(error)
        }
    }

    return result
}


module.exports = birthdateCelebrate