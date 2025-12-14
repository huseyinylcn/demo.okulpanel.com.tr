const fs = require('fs');
const PDFDocument = require('pdfkit-table');

// Font yolu (Global sabit olarak kalabilir)
const FONT_PATH = 'C:\\Windows\\Fonts\\arial.ttf';

/**
 * PDF oluşturur ve Buffer olarak döner.
 * @param {Array} veri - Öğrenci verisi
 * @returns {Promise<Buffer>} - PDF verisini içeren Buffer
 */
function pdfOlustur(veri) {
    return new Promise(async (resolve, reject) => {
        try {
            // Dökümanı fonksiyonun içinde oluşturuyoruz
            const doc = new PDFDocument({ margin: 30, size: 'A4' });

            // Buffer parçalarını toplamak için dizi
            const buffers = [];

            // 'data' event'i tetiklendikçe buffer parçalarını ekle
            doc.on('data', buffers.push.bind(buffers));

            // 'end' event'i tetiklendiğinde buffer'ları birleştir ve resolve et
            doc.on('end', () => {
                const pdfData = Buffer.concat(buffers);

                resolve(pdfData);
            });

            // Hata yakalama (Stream hatası olursa)
            doc.on('error', (err) => {
                reject(err);
            });

            // Font yükleme denemesi
            try {
                doc.font(FONT_PATH);
            } catch (e) {

            }

            // --- İÇERİK OLUŞTURMA DÖNGÜSÜ (Değiştirilmedi) ---
            for (const [index, ogr] of veri.entries()) {

                // --- 1. BAŞLIKLAR ---
                doc.font(FONT_PATH);



                doc.fontSize(20).text(`AHMET HAZIM ULUŞAHİN İMAM HATİP ORTAOKULU`, { align: 'center' });
                doc.moveDown(1);

                
                if (ogr[0][0]) {
                    doc.fontSize(12).text(`Sayın Velimiz,`);
                    doc.text(`Öğrencimiz ${ogr[0][0].AdSoyad} (No: ${ogr[0][0].OgrenciNumara}) (Sınıf: ${ogr[0][0].Sinif}) ait bilgileri aşağıdadır.`);
                    doc.moveDown(1);
                }
                else {
                   
                        try {
                           let isim = ogr[2][0].AdSoyad
                           let no = ogr[2][0].OgrenciNumara
                           let sinif = ogr[2][0].Sinif


                            if (isim == undefined) isim = ""
                            if (no == undefined) no = ""
                            if (sinif == undefined) sinif = ""


                            doc.fontSize(12).text(`Sayın Velimiz,`);
                            doc.text(`Öğrencimiz ${isim} (No: ${no}) (Sınıf: ${sinif}) ait bilgileri aşağıdadır.`);
                            doc.moveDown(1);

                        } catch (error) {
                             
                           
                            doc.moveDown(1);
                        }


                  

                    










                }
                // return


                // --- 2. TABLO 1: DERS NOTLARI ---
                const rowsIcinHazirVeri = ogr[0].map(item => [item.Ders, item.puan]);

                const tablo1 = {
                    title: "Sınav Notları",
                    headers: ["Ders", "Puan"],
                    rows: rowsIcinHazirVeri
                };

                await doc.table(tablo1, {
                    width: 500,
                    prepareHeader: () => doc.font(FONT_PATH).fontSize(8),
                    prepareRow: () => doc.font(FONT_PATH).fontSize(8)
                });

                doc.moveDown(1.1);
                


                doc.fontSize(12).text(`Deneme Sonuçları`);
                doc.moveDown(0.2);

                // --- TABLO ÜSTÜ ÇİZİM ALANI ---
                const startX = 30;
                const ustBaslikYuksekligi = 15;
                let currentX = startX + 50;

                const sabitY = doc.y;

                const dersIsimleri = ["Türkçe", "Sosyal", "Din Kültürü", "İngilizce", "Matematik", "Fen Bilgisi"];
                const dersKutuGenisligi = 19 + 19 + 24;

                doc.font(FONT_PATH).fontSize(8).fillColor('black');

                dersIsimleri.forEach(ders => {
                    doc.rect(currentX, sabitY, dersKutuGenisligi, ustBaslikYuksekligi).stroke('#DBDBDB');
                    doc.text(ders, currentX, sabitY + 4, { width: dersKutuGenisligi, align: 'center' });
                    currentX += dersKutuGenisligi;
                });

                doc.rect(startX, sabitY, 50, ustBaslikYuksekligi).stroke();
                doc.rect(currentX, sabitY, 25, ustBaslikYuksekligi).stroke();
                doc.rect(currentX + 25, sabitY, 40, ustBaslikYuksekligi).stroke();

                doc.y = sabitY + ustBaslikYuksekligi;

                // --- 3. TABLO 2: DENEME SONUÇLARI ---
                const denemeHeaders = [];
                denemeHeaders.push({ label: "Sınav", width: 50, align: "left", headerAlign: "center" });

                for (let i = 0; i < 6; i++) {
                    denemeHeaders.push({ label: "D", width: 19, align: "center", headerAlign: "center" });
                    denemeHeaders.push({ label: "Y", width: 19, align: "center", headerAlign: "center" });
                    denemeHeaders.push({ label: "N", width: 24, align: "center", headerAlign: "center" });
                }

                denemeHeaders.push({ label: "T. Net", width: 25, align: "center", headerAlign: "center" });
                denemeHeaders.push({ label: "Puan", width: 40, align: "center", headerAlign: "center" });

                const rowsIcinHazirVeri2 = ogr[2].map(item => [
                    item.name,
                    item.turkceDogru, item.turkceYanlis, item.turkceNet,
                    item.sosyalDogru, item.sosyalYanlis, item.sosyalNet,
                    item.dinDogru, item.dinYanlis, item.dinNet,
                    item.ingilizceDogru, item.ingilizceYanlis, item.ingilizceNet,
                    item.matematikDogru, item.matematikYanlis, item.matematikNet,
                    item.fenDogru, item.fenYanlis, item.fenNet,
                    item.toplamNet,
                    item.puan
                ]);

                const tablo2 = {
                    headers: denemeHeaders,
                    rows: rowsIcinHazirVeri2
                };

                doc.moveDown(0.5);

                await doc.table(tablo2, {
                    x: startX,
                    prepareHeader: () => doc.font(FONT_PATH).fontSize(7).fillColor('black'),
                    prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
                        if (indexColumn === 0) {
                            doc.rect(rectCell.x, rectCell.y, rectCell.width, rectCell.height).fill('#eaf2f8');
                        }
                        else if (indexColumn === denemeHeaders.length - 1) {
                            doc.rect(rectCell.x, rectCell.y, rectCell.width, rectCell.height).fill('#fcf3cf');
                        }
                        else if (indexColumn % 2 !== 0) {
                            doc.rect(rectCell.x, rectCell.y, rectCell.width, rectCell.height).fill('#f4f4f4');
                        }
                        doc.font(FONT_PATH).fontSize(7).fillColor('black');
                    }
                });

                doc.moveDown(1.1);

                // --- 4. TABLO 3: ÖDEV NOTLARI ---
                const rowsIcinHazirVeri3 = ogr[1].map(item => {
                    const tarih = item.TeslimTarihi ? new Date(item.TeslimTarihi).toISOString().split('T')[0] : "-";
                    return [item.DersAdi, item.Konu, tarih, item.puan];
                });

                const tablo3 = {
                    title: "Ödev İstatistiği",
                    headers: ["Ders", "Konu", "Teslim Tarihi", "Puan"],
                    rows: rowsIcinHazirVeri3
                };

                await doc.table(tablo3, {
                    width: 500,
                    prepareHeader: () => doc.font(FONT_PATH).fontSize(8),
                    prepareRow: () => doc.font(FONT_PATH).fontSize(8)
                });

                // Sonraki öğrenci varsa yeni sayfa ekle
                if (index < veri.length - 1) {
                    doc.addPage();
                }
            }

            // Döngü bittiğinde PDF'i sonlandır
            doc.end();

        } catch (err) {
            reject(err);
        }
    });
}


async function examHomeworkTrialReport(data, { TeacherRepository }) {






    let result = await TeacherRepository.examHomeworkTrialReport(data)



    let control = false
    if (result[1].length > 0) {
        if ((result[1][0].matematikDogru + result[1][0].matematikYanlis + result[1][0].matematikBos) == 15) control = true


        if ((result[1][0].fenDogru + result[1][0].fenYanlis + + result[1][0].fenBos) == 15) control = true


        if (control) {
            for (let obj of result[1]) {
                let p = ((obj.matematikNet * 4) + (obj.fenNet * 4) + (obj.ingilizceNet * 1) + (obj.dinNet * 1) + (obj.sosyalNet * 1) + (obj.turkceNet * 4));

                let maks_net = 210;


                let nihaiPuan = 100 + ((p / maks_net) * 400);

                obj.puan = parseFloat(nihaiPuan.toFixed(2));
            }
        }

    }













    const tumVeriler = result.flat();


    const gruplanmisObje = tumVeriler.reduce((acc, veri) => {
        const numara = veri.OgrenciNumara;


        if (!acc[numara]) {
            acc[numara] = [[], [], []];
        }


        if (veri.tip === "Odev") {
            acc[numara][1].push(veri);
        } else if (veri.tip === "Sinav") {
            acc[numara][0].push(veri);
        } else if (veri.tip === "Deneme") {
            acc[numara][2].push(veri);
        }

        return acc;
    }, {});


    const sonuc = Object.values(gruplanmisObje);






    let sonhali = await pdfOlustur(sonuc);




    return sonhali



}

module.exports = examHomeworkTrialReport





