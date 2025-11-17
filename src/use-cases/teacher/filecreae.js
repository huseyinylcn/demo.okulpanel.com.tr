const xlsx = require("xlsx")

const teacherEnity = require("./../../domain/teacher/teacherEnity")



function excelDateToString(value) {
  // Eğer sayıysa (Excel seri numarası)
  if (!isNaN(value)) {
    const excelEpoch = new Date(1899, 11, 30); // Excel 0 günü (1900-01-00 gibi)
    const date = new Date(excelEpoch.getTime() + value * 86400000);
    return date.toISOString().split("T")[0]; // yyyy-mm-dd formatı
  }

  // Eğer string ise (zaten tarih formatında gelmişse)
  const date = new Date(value);
  if (!isNaN(date)) {
    return date.toISOString().split("T")[0];
  }

  return null; // Geçersizse null döner
}

async function filecreae(data,{TeacherRepository}) {
    let kayitError = []
        const dosya = xlsx.readFile(`./uploads/${data.filename}`)
    
        let sayfaAdi = dosya.SheetNames[0]
        let sayfa = dosya.Sheets[sayfaAdi]
    
        

    let veri = xlsx.utils.sheet_to_json(sayfa, { defval: null });







for (const element of veri) {
    const yapi = {
        AdSoyad: element["İsim ve Soyisim *"],
        Cinsiyet: element["Cinsiyet"] === "Erkek" ? 1 : 0,
        DogumTarihi:  excelDateToString(element["Doğum Tarihi *"]) ,
        TCKimlikNo: String(element["TC *"]),
        Telefon: String(element["Telefon *"]),
        Eposta: String(element["E-Posta *"]),
        Bolum: String(element["Bölüm *"]),
        photo: "default.png"
  
    };




    try {
        let res =  new teacherEnity(yapi);
       
        let res2 =  TeacherRepository.Teachercreate(res);
    } catch (error) {
        console.log(error)
        kayitError.push({ isim: yapi.AdSoyad, OgrenciNumara: yapi.OgrenciNumara,Hata:error.message });
    }
}






    return kayitError

}


module.exports = filecreae