async function info(data,{userRepository}) {
    let result;
    if(data.rol == "1"){
        result = await userRepository.adminInfo(data)
    }else if(data.rol == "2"){
        result = await userRepository.teacherInfo(data)
    }else if(data.rol == "3"){
        result = await userRepository.studentInfo(data)


    }else{
     throw new Error("Veri Bulunamda")
    }


    return result.recordset[0]

}



module.exports = info