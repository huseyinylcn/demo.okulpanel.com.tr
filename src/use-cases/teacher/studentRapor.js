const PdfPrinter = require("pdfmake");

const fonts = {
  Arial: {
    normal: "C:/Windows/Fonts/arial.ttf",
    bold: "C:/Windows/Fonts/arialbd.ttf",
    italics: "C:/Windows/Fonts/ariali.ttf",
    bolditalics: "C:/Windows/Fonts/arialbi.ttf"
  }
};

// Ödev durumu fonksiyonu
function getOdevDurumu(puan) {
  if (puan === '100' || puan === 100) return "Yaptı";
  if (puan === '50' || puan === 50) return "Yarım yaptı";
  if (puan === '0' || puan === 0) return "Yapmadı";
  return "-";
}

async function generateStudentPdf(dersData, odevData) {
  if (!dersData || dersData.length === 0) throw new Error("Ders verisi yok!");

  // Ortak bilgiler (ilk satırdan al)
  const { AdSoyad, OgrenciNumara, Sinif } = dersData[0];

  // Ders tablosu (mevcut)
  const dersBody = [
    ["Ders", "Tarih", "Sınav Adı", "Puan"]
  ];
  dersData.forEach(item => {
    dersBody.push([
      item.Ders,
      item.Tarih ? new Date(item.Tarih).toLocaleDateString("tr-TR") : "-",
      item.SinavAdi,
      item.puan !== null ? String(item.puan) : "-"
    ]);
  });

  // Ödev tablosu (yeni, puansız)
  const odevBody = [
    ["Ders", "Teslim Tarihi", "Durum"]
  ];
  odevData.forEach(item => {
    odevBody.push([
      item.DersAdi.trim(),
      item.TeslimTarihi ? new Date(item.TeslimTarihi).toLocaleDateString("tr-TR") : "-",
      getOdevDurumu(item.puan)
    ]);
  });

  const printer = new PdfPrinter(fonts);
  const doc = printer.createPdfKitDocument({
    content: [
      { text: "Öğrenci Not Raporu", style: "mainHeader" },
      { text: `Ad Soyad: ${AdSoyad} | No: ${OgrenciNumara} | Sınıf: ${Sinif}`, style: "subHeader" },

      // Mevcut ders tablosu
      {
        table: {
          headerRows: 1,
          widths: ["*", "auto", "*", "auto"],
          body: dersBody
        },
        margin: [0, 10, 0, 20]
      },

      // Yeni ödev tablosu
      { text: "Ödevler", style: "subHeader" },
      {
        table: {
          headerRows: 1,
          widths: ["*", "auto", "*"], // 3 sütun
          body: odevBody
        }
      }
    ],
    styles: {
      mainHeader: { fontSize: 16, bold: true, margin: [0, 0, 0, 10] },
      subHeader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] }
    },
    defaultStyle: { font: "Arial" }
  });

  return new Promise((resolve, reject) => {
    const chunks = [];
    doc.on("data", chunk => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", err => reject(err));
    doc.end();
  });
}

async function studentRapor(data, { TeacherRepository }) {
  const result = await TeacherRepository.studentRapor(data);

  // result = { dersProgrami: [...], odevPuanlari: [...] }
  const pdfBuffer = await generateStudentPdf(result[0], result[1]);
  return pdfBuffer;
}

module.exports = studentRapor;
