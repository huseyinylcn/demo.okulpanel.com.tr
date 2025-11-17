

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
}


}


module.exports = helperfunc