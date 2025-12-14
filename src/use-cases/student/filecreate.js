
const xlsx = require("xlsx")
let studentEnity = require("./../../domain/student/studentEnity")

const dayjs = require('dayjs');


const customParseFormat = require('dayjs/plugin/customParseFormat');

dayjs.extend(customParseFormat);

function excelDateToString(value) {

    if (typeof value === 'number' && !isNaN(value)) {

        const date = new Date(1899, 11, 30 + value);
        if (!isNaN(date.getTime())) {
            return date.toISOString().split("T")[0];
        }
    }

    if (typeof value === 'string') {
      
        const date = dayjs(value); 

        if (date.isValid()) {
            return date.format('YYYY-MM-DD'); 
        }
    }
    
    // 3. Hata
    return '1900-01-01';
}

async function filecreate(data, { StudentRepository, financeRepository,financeCreate,helperFunc }) {
  let kayiterror = []

  const dosya = xlsx.readFile(`./uploads/${data.filename}`)

  let sayfaAdi = dosya.SheetNames[0]
  let sayfa = dosya.Sheets[sayfaAdi]

  let veri = xlsx.utils.sheet_to_json(sayfa, { defval: null });


  for (const element of veri) {
    const yapi = {
      Sinif: element["Sınıf *"],
      OgrenciNumara: String(element["Numara *"]),
      AdSoyad: element["İsim Soyisim *"],
      TCKimlikNo: String(element["TC *"]),

      DogumTarihi: String(element["Doğum Tarihi *"]),
      AnneAdSoyad: element["Anne Adı Soyadı"],
      BabaAdSoyad: element["Baba Adı soyadı"],

      Sag: String(element["Sağ"]),
      AnneEgitim: element["Anne Eğitim "],
      BabaEgitim: element["Baba Eğitim"],
      AnneMeslek: element["Anne Meslek"],
      BabaMeslek: element["Baba Meslek"],
      SuregenRahatsizlik: String(element["Süreğen rahatsızlık"]),
      AylikGelir: String(element["Aylık gelir"]),
      AnneTel: String(element["Anne Tel"]),
      BabaTel: String(element["Baba Tel"]),


      photo: "default.png"
    };

    if (element["Cinsiyeti"] == "Erkek") {
      yapi.Cinsiyet = 1
    } else if (element["Cinsiyeti"] == "Kadın") {
      yapi.Cinsiyet = 0
    } else {
      yapi.Cinsiyet = null
    }

    if (element["Ber/Ayrı"] == "Beraber") {
      yapi.VeliDurum = 1
    } else if (element["Ber/Ayrı"] == "Ayrı") {
      yapi.VeliDurum = 0
    } else {
      yapi.VeliDurum = null
    }

    if (element["Engel"] == "Var") {
      yapi.Engel = 1
    } else if (element["Engel"] == "Yok") {
      yapi.Engel = 0
    } else {
      yapi.Engel = null
    }


    try {
        yapi.DogumTarihi = excelDateToString(element["Doğum Tarihi"])

        let res = await new studentEnity(yapi);
        let studentCreateResult = await StudentRepository.studentCreate(res);
    } catch (error) {
      console.log(error)
      kayiterror.push(yapi);
    }
  }







  return kayiterror

}


module.exports = filecreate