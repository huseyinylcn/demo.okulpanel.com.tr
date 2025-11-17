
const xlsx = require("xlsx")
let studentEnity = require("./../../domain/student/studentEnity")



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

return '1900-01-01'
}


async function filecreate(data, { StudentRepository }) {
    let kayiterror = []

    const dosya = xlsx.readFile(`./uploads/${data.filename}`)

    let sayfaAdi = dosya.SheetNames[0]
    let sayfa = dosya.Sheets[sayfaAdi]

    let veri = xlsx.utils.sheet_to_json(sayfa, { defval: null });


for (const element of veri) {
    const yapi = {
        Sinif: element["Sınıf *"],
        OgrenciNumara: String(element["Numara *"]),
        BabaAdSoyad: element["Baba Adı soyadı *"],
        AdSoyad: element["İsim Soyisim *"],
        AnneAdSoyad: element["Anne Adı Soyadı *"],
        TCKimlikNo: String(element["TC *"]),
        Cinsiyet: element["Cinsiyeti"] === "Erkek" ? 1 : 0,
        DogumTarihi:String(element["Doğum Tarihi"]),
        AnneEgitim: element["Anne Eğitim "],
        BabaEgitim: element["Baba Eğitim"],
        AnneMeslek: element["Anne Meslek"],
        BabaMeslek: element["Baba Meslek"],
        SuregenRahatsizlik: String(element["Süreğen rahatsızlık"]),
        AylikGelir: String(element["Aylık gelir"]),
        AnneTel: String(element["Anne Tel"]),
        BabaTel: String(element["Baba Tel"]),
        Engel: element["Engel"]  === "Var" ? 1 : 0,
        VeliDurum: element["Ber/Ayrı"]  === "Beraber" ? 1 : 0,
        Sag: String(element["Sağ"]),
        photo: "default.png"
    };

    
    try {
        yapi.DogumTarihi =  excelDateToString(element["Doğum Tarihi"])
        let res = await new studentEnity(yapi);
        let xx = await StudentRepository.studentCreate(res);
    } catch (error) {
        kayiterror.push({ isim: yapi.AdSoyad, OgrenciNumara: yapi.OgrenciNumara,HATA:error.message });
    }
}







    return kayiterror

}


module.exports = filecreate