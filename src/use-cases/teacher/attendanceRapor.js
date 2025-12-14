const PdfPrinter = require("pdfmake");

const logyaz = require("./../../utils/logSave")
const AdmZip = require('adm-zip');






const fs = require("fs");







const puppeteer = require('puppeteer');


async function pdfCR(dataa) {

  try {
    //  console.log(dataa)
    const browser = await puppeteer.launch({
      headless: true,
      // executablePath: "C:\\puppeteer\\chrome\\win64-140.0.7339.207\\chrome-win64\\chrome.exe", 
      executablePath: "C:\\puppeteer-cache\\chrome\\win64-140.0.7339.207\\chrome-win64\\chrome.exe", 
      args: ['--no-sandbox']
    });
    const page = await browser.newPage();

    // HTML içeriğini sayfaya ver
    let html = fs.readFileSync("index.html", "utf8");

    // Doğru placeholder'ı kullan
    html = html.replace("{{ ITEMS_JSON }}", JSON.stringify(dataa));

    // console.log("HTML'de items değişkeni:", JSON.stringify(dataa)); // Debug için

    await page.setContent(html);

    // PDF oluştur (dosya değil Buffer döner)
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      landscape: true
    });

    await browser.close();
    return pdfBuffer;
  } catch (error) {
    logyaz(error)
  }
  // console.log("pdfCR - Gelen data:", dataa); // Debug için


}















function haftaHaftaAyir(veri) {
  const haftalar = {};

  veri.forEach(item => {
    const tarih = new Date(item.tarih);
    // Haftanın başlangıç tarihini buluyoruz (Pazartesi)
    const gun = tarih.getDay(); // 0 = Pazar, 1 = Pazartesi, ...
    const pazartesi = new Date(tarih);
    pazartesi.setDate(tarih.getDate() - (gun === 0 ? 6 : gun - 1)); // Pazartesi tarihine çek
    const key = pazartesi.toISOString().slice(0, 10);

    if (!haftalar[key]) {
      haftalar[key] = [];
    }
    haftalar[key].push(item);
  });

  // Nesneyi diziye çevir
  return Object.values(haftalar);
}














async function attendanceRapor(data, { TeacherRepository }) {
  if (data.Sinif == 'all') {
    const zip = new AdmZip();
    let allClass = await TeacherRepository.classGet()
    for (const sinif of allClass) {
      data.Sinif = sinif.SinifAdi
      const result = await TeacherRepository.attendanceRapor(data);
      let yeni = await haftaHaftaAyir(result)
      const pdfBuffer = await pdfCR(yeni);
      const fileName = `${sinif.SinifAdi}.pdf`;
      zip.addFile(fileName, pdfBuffer);

    }
    const zipBuffer = zip.toBuffer();
    return zipBuffer;
  }


  const result = await TeacherRepository.attendanceRapor(data);


  let yeni = await haftaHaftaAyir(result)


  const pdfBuffer = await pdfCR(yeni);


  return pdfBuffer;
}

module.exports = attendanceRapor;
