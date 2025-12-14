

let helperfunc = {
async gunBul(tarih) {
  const gunler = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
  const date = new Date(tarih); 
  return gunler[date.getDay()];
},


async eslestir(girdi) {
  // Türkçe karakterleri sadeleştirip normalize eden küçük yardımcı
  function normalize(str) {
    return str
      .trim()
      .toLowerCase()
      .replace(/ı/g, "i")
      .replace(/ş/g, "s")
      .replace(/ç/g, "c")
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ö/g, "o");
  }

  // Levenshtein mesafesi hesaplayan küçük fonksiyon (benzerlik için)
  function levenshtein(a, b) {
    const m = [];
    for (let i = 0; i <= b.length; i++) m[i] = [i];
    for (let j = 0; j <= a.length; j++) m[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        m[i][j] =
          b[i - 1] === a[j - 1]
            ? m[i - 1][j - 1]
            : Math.min(m[i - 1][j - 1] + 1, m[i][j - 1] + 1, m[i - 1][j] + 1);
      }
    }
    return m[b.length][a.length];
  }

  // Kategoriler ve olası yazılışları
  const kategoriler = {
    fen: ["fen", "fen bilimleri", "fenbilimleri", "fenn", "fennbilim"],
    matematik: ["matematik", "mat", "matamatik"],
    turkce: ["türkçe", "turkce", "turk"],
    sosyal: ["sosyal", "sosyal bilimler", "sosyalbilimleri", "sosyall","T.C. İNKILAP TARİHİ VE ATATÜRKÇÜLÜK"],
    din: ["din", "din kültürü", "din kültürü ve ahlak bilgisi"],
        ingilizce: ["İngilizce", "İNGİLİZCE", "ing","İNG","ING"],
  };

  const giris = normalize(girdi);
  let enYakin = null;
  let enDusukMesafe = Infinity;

  for (const [kategori, kelimeler] of Object.entries(kategoriler)) {
    for (const kelime of kelimeler) {
      const mesafe = levenshtein(giris, normalize(kelime));
      if (mesafe < enDusukMesafe) {
        enDusukMesafe = mesafe;
        enYakin = kategori;
      }
    }
  }

  return enYakin;
},


async sonrakiAy(data){
  const tarih = new Date(data);
  tarih.setMonth(tarih.getMonth() + 1);

  return tarih.toISOString().slice(0, 10);
},


async gunTarihBul(startDate, endDate, Gun) {
    const foundDays = [];
    
    // Gün isimlerini JavaScript Date.getDay() indekslerine (0-6) eşleyen obje
    const gunMap = {
        'Pazar': 0,
        'Pazartesi': 1,
        'Salı': 2,
        'Çarşamba': 3,
        'Perşembe': 4,
        'Cuma': 5,
        'Cumartesi': 6
    };

    // Gelen gün isminin indeks karşılığını al (Örn: "Salı" -> 2)
    const targetDayIndex = gunMap[Gun];

    // Eğer geçersiz bir gün ismi girilirse boş dizi döndür veya hata fırlat
    if (targetDayIndex === undefined) {
        console.error("Geçersiz gün ismi:", Gun);
        return [];
    }

    // YYYY-MM-DD formatındaki dizeleri Date nesnelerine dönüştür
    const current = new Date(startDate);
    const end = new Date(endDate);

    // Saat dilimi kaymalarını önlemek için saatleri günün başlangıcına ayarla
    current.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    // İlk hedef günü bulma mantığı
    const currentDayOfWeek = current.getDay();
    
    // Formül: (HedefGün - ŞuAnkiGün + 7) % 7
    // Bu işlem bize ilk hedef güne ulaşmak için kaç gün eklememiz gerektiğini verir.
    let daysToAdd = (targetDayIndex - currentDayOfWeek + 7) % 7;
    
    // Tarihi aralıktaki ilk hedef güne (Örn: İlk Salı'ya) ayarla
    current.setDate(current.getDate() + daysToAdd);
    
    // Döngü: İlk hedef günden başlayıp bitiş tarihine kadar 7'şer gün ekle
    while (current <= end) {
        // Tarihi YYYY-MM-DD formatına dönüştürme mantığı
        const year = current.getFullYear();
        const month = String(current.getMonth() + 1).padStart(2, '0');
        const day = String(current.getDate()).padStart(2, '0');
        
        foundDays.push(`${year}-${month}-${day}`);
        
        // Bir sonraki haftanın aynı gününe geç (7 gün ekle)
        current.setDate(current.getDate() + 7);
    }
    
    return foundDays;
}





}


module.exports = helperfunc