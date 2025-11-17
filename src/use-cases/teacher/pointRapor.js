const PdfPrinter = require("pdfmake");

const fonts = {
  Arial: {
    normal: "C:/Windows/Fonts/arial.ttf",
    bold: "C:/Windows/Fonts/arialbd.ttf",
    italics: "C:/Windows/Fonts/ariali.ttf",
    bolditalics: "C:/Windows/Fonts/arialbi.ttf"
  }
};

async function generatePointPdf(data, info) {
  // info = { Ders, SinavAdi, Sinif }

  const body = [
    ["Öğrenci Numarası", "Ad Soyad", "Puan"]
  ];

  data.forEach(item => {
    body.push([
      item.OgrenciNumara,
      item.AdSoyad,
      item.puan !== null ? String(item.puan) : "-"
    ]);
  });

  const printer = new PdfPrinter(fonts);
  const doc = printer.createPdfKitDocument({
    content: [
      { text: "Öğrenci Puan Raporu", style: "mainHeader" },
      { 
        text: `Ders: ${info.Ders} | Sınav: ${info.SinavAdi} | Sınıf: ${info.Sinif}`, 
        style: "subHeader" 
      },
      {
        table: {
          headerRows: 1,
          widths: ["auto", "*", "auto"],
          body: body
        },
        margin: [0, 10, 0, 0]
      }
    ],
    styles: {
      mainHeader: { fontSize: 16, bold: true, margin: [0, 0, 0, 10] },
      subHeader: { fontSize: 14, margin: [0, 0, 0, 10] }
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

// Use case
async function pointRapor(data, { TeacherRepository }) {
  const result = await TeacherRepository.pointRapor(data);

  // Başlık için info al (ilk eleman üzerinden)
  const info = {
    Ders: data.Ders || "",
    SinavAdi: data.SinavAdi || "",
    Sinif: data.Sinif || ""
  };

  const pdfBuffer = await generatePointPdf(result, info);
  return pdfBuffer;
}

module.exports = pointRapor;
