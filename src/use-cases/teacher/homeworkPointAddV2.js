async function homeworkPointAddV2UseCase(data, { TeacherRepository }) {




    for (const obj of data.points) {
        try {
            console.log(obj)

            if (obj.puan == -1 || obj.puan == "-1") {
                console.log("buna verilmemiş")
            } else {
                await TeacherRepository.homeworkpointadd(obj)
            }

        } catch (error) {
            // puanları eklenmeyen öğrencileri burada kayıt edip geri bildirmen gerek

        }
    }


    return true

}


module.exports = homeworkPointAddV2UseCase