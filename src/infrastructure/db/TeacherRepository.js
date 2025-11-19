const sql = require("mssql")
const logyaz = require("./../../utils/logSave")


let TeacherRepository = {
  async Teachercreate(data) {
    try {
      await new sql.Request()
        .input("AdSoyad", sql.NVarChar, data.AdSoyad)
        .input("Cinsiyet", sql.Bit, data.Cinsiyet)
        .input("DogumTarihi", sql.Date, data.DogumTarihi)
        .input("TCKimlikNo", sql.NVarChar, data.TCKimlikNo)
        .input("Telefon", sql.NVarChar, data.Telefon)
        .input("Eposta", sql.NVarChar, data.Eposta)
        .input("Bolum", sql.NVarChar, data.Bolum)
        .input("Fotograf", sql.NVarChar, data.Fotograf)

        .query(`
          
          
MERGE INTO Ogretmenler AS target
USING (SELECT @TCKimlikNo AS TCKimlikNo) AS source
ON target.TCKimlikNo = source.TCKimlikNo
WHEN MATCHED THEN
    UPDATE SET 
        AdSoyad = @AdSoyad,
        Cinsiyet = @Cinsiyet,
        DogumTarihi = @DogumTarihi,
        Telefon = @Telefon,
        Eposta = @Eposta,
        Bolum = @Bolum,
        Fotograf = @Fotograf
WHEN NOT MATCHED THEN
    INSERT (AdSoyad, Cinsiyet, DogumTarihi, TCKimlikNo, Telefon, Eposta, Bolum, Fotograf)
    VALUES (@AdSoyad, @Cinsiyet, @DogumTarihi, @TCKimlikNo, @Telefon, @Eposta, @Bolum, @Fotograf);

                      
                      
                      `)



    } catch (error) {

      throw new Error(`SQL Kayıt Hatası ${error.message}`)
    }
  },
  async allTeacherGet() {
    try {
      let result = await new sql.Request()
        .query(`SELECT * FROM [demo].[dbo].[Ogretmenler] order by AdSoyad`)
      return result.recordsets[0]
    } catch (error) {
      throw new Error(`Sql Kayıt hatası ${error}`)
    }
  },

  async scheduleGet(data) {
    try {
      let result = await new sql.Request()
        .input("id", sql.Int, data.id)
        .query(`
              SELECT dp.*,
                o.AdSoyad
              FROM [demo].[dbo].[DersProgrami] dp
              INNER JOIN [demo].[dbo].[Ogretmenler] o
                    ON dp.OgretmenID = o.OgretmenID
              WHERE dp.OgretmenID = @id`)
      return result.recordsets[0]
    } catch (error) {
      throw new Error(`Sql Kayıt hatası ${error}`)
    }
  },

  async dersler(data) {
    try {

      let result = await new sql.Request()
        .input("Sinif", sql.NVarChar, data.Sinif)
        .input("Gun", sql.NVarChar, data.Gun)

        .query(`
            SELECT *
            FROM [demo].[dbo].[DersProgrami] where Gun = @Gun and Sinif = @Sinif
        `)

      return result.recordset

    } catch (error) {
      throw new Error(`SQL GET HATASI ${error.message}`)
    }
  },



  async attendance(data) {
    try {
      console.log(data)
      let result = await new sql.Request()
        .input("Sinif", sql.NVarChar, data.Sinif)
        .input("tarih", sql.NVarChar, data.Tarih)
        .input("DersSaati", sql.NVarChar, data.DersSaati)
        .input("ProgramID", sql.Int, data.ProgramID)

        .query(`
                
 IF EXISTS (
 select * from grupOgrencileri where ProgramID = @ProgramID
            )
 BEGIN
 
            select 

                o.OgrenciId,
                o.OgrenciNumara,
                o.AdSoyad,
                gp.ProgramID,
                dp.Gun,
                dp.DersSaati,
                dp.Ders,
                @tarih as tarih,
                y.durum

            from grupOgrencileri gp
            inner join Ogrenciler o on o.OgrenciId = gp.OgrenciID 
            left join DersProgrami dp on dp.ProgramID = gp.ProgramID
            left join yoklama y on o.OgrenciId = y.OgrenciID  AND dp.ProgramID = y.ProgramID and y.tarih =   @tarih

            where gp.ProgramID = @ProgramID  AND dp.DersSaati = @DersSaati AND o.Sinif = @Sinif
            
            -- EKLEME 1
            ORDER BY TRY_CAST(o.OgrenciNumara AS INT) ASC 


 END 
 ELSE
 BEGIN
 
   IF EXISTS (
    SELECT 1
    FROM Ogrenciler o
    INNER JOIN DersProgrami dp
      ON o.Sinif = dp.Sinif
    LEFT JOIN yoklama y
      ON o.OgrenciId = y.OgrenciID
       AND dp.ProgramID = y.ProgramID
       AND y.tarih =  @tarih
    WHERE o.Sinif = @Sinif
      AND dp.DersSaati = @DersSaati
      AND dp.ProgramID = @ProgramID
  )
  BEGIN
    -- Ana sorgu
    SELECT 
      o.OgrenciId,
      o.OgrenciNumara,
      o.AdSoyad,
      dp.ProgramID,
      dp.Gun,
      dp.DersSaati,
      dp.Ders,
        @tarih as tarih,
      y.durum
    FROM Ogrenciler o
    INNER JOIN DersProgrami dp
      ON o.Sinif = dp.Sinif
    LEFT JOIN yoklama y
      ON o.OgrenciId = y.OgrenciID
       AND dp.ProgramID = y.ProgramID

       AND y.tarih =   @tarih

    WHERE o.Sinif = @Sinif
      AND dp.DersSaati = @DersSaati
      AND dp.ProgramID =  @ProgramID
     
     -- EKLEME 2
     ORDER BY TRY_CAST(o.OgrenciNumara AS INT) ASC
  END
  ELSE
  BEGIN
    -- Kurs öğrencileri sorgusu
     SELECT 

      o.OgrenciId,
      o.OgrenciNumara,
      o.AdSoyad,
      dp.ProgramID,
      dp.Gun,
      dp.DersSaati,
      dp.Ders,
       @tarih as tarih,
      y.durum

     FROM kursOgrencileri ko

     left JOIN DersProgrami dp on dp.Sinif = ko.sinifAdi

     LEFT JOIN Ogrenciler o on ko.OgrenciId = o.OgrenciId
     left join yoklama y on ko.OgrenciId = y.OgrenciID  AND dp.ProgramID = y.ProgramID and y.tarih =   @tarih

     where 
     ko.sinifAdi = @Sinif and 
     dp.DersSaati = @DersSaati and 
     dp.ProgramID =  @ProgramID
      
      -- EKLEME 3
      ORDER BY TRY_CAST(o.OgrenciNumara AS INT) ASC
  END

END

`)

      return result.recordset

    } catch (error) {
      throw new Error(`SQL GET HATASI ${error.message}`)
    }
  },














  async attendanceadd(data) {
    try {

      let result = await new sql.Request()
        .input("tarih", sql.Date, data.tarih)
        .input("OgrenciID", sql.Int, data.OgrenciID)
        .input("ProgramID", sql.Int, data.ProgramID)
        .input("durum", sql.Int, data.durum)

        .query(`
 
MERGE INTO [dbo].[yoklama] AS target
USING (
    SELECT 
        @tarih AS tarih,
        @OgrenciID AS OgrenciID,
        dp.ProgramID,
        @durum AS durum,
        dp.Gun,
        dp.DersSaati,
        dp.Ders,
        dp.Sinif
    FROM [dbo].[DersProgrami] dp
    WHERE dp.ProgramID = @ProgramID
) AS source
ON target.tarih = source.tarih
   AND target.ProgramID = source.ProgramID
   AND target.OgrenciID = source.OgrenciID
WHEN MATCHED THEN
    UPDATE SET 
        target.durum = source.durum,
        target.Gun = source.Gun,
        target.DersSaati = source.DersSaati,
        target.Ders = source.Ders,
        target.Sinif = source.Sinif
WHEN NOT MATCHED THEN
    INSERT (tarih, OgrenciID, ProgramID, durum, Gun, DersSaati, Ders, Sinif)
    VALUES (source.tarih, source.OgrenciID, source.ProgramID, source.durum, source.Gun, source.DersSaati, source.Ders, source.Sinif);



  `)

      return true

    } catch (error) {
      throw new Error(`SQL GET HATASI ${error.message}`)
    }
  },








  async attendanceNatfication(data) {
    try {

      let result = await new sql.Request()
        .input("OgrenciID", sql.Int, data.OgrenciID)
        .input("ProgramID", sql.Int, data.ProgramID)


        .query(`
 SELECT tk.fcm_token, o.OgrenciId, o.OgrenciNumara, dp.DersSaati, dp.Ders,o.AdSoyad
  FROM [demo].[dbo].[FCM_TOKEN] tk
  inner join [demo].[dbo].[Ogrenciler] o on o.OgrenciId = tk.[user_id]
  inner join [demo].[dbo].[DersProgrami] dp on dp.ProgramID = @ProgramID
  where [user_type] = 'student' and [user_id] = @OgrenciID


          
  `)

      return result.recordset

    } catch (error) {
      throw new Error(`SQL GET HATASI ${error.message}`)
    }
  },










  async homework(data) {
    try {

      let result = await new sql.Request()
        .input("DersAdi", sql.NVarChar, data.DersAdi)
        .input("Konu", sql.NVarChar, data.Konu)
        .input("Aciklama", sql.NVarChar, data.Aciklama)
        .input("TeslimTarihi", sql.Date, data.TeslimTarihi)
        .input("puan", sql.NVarChar, data.puan)
        .input("durum", sql.NVarChar, data.durum)
        .input("tarih", sql.Date, data.tarih)
        .input("OgrenciNo", sql.Int, data.OgrenciNumara)
        .input("KayitTuru", sql.Int, data.KayitTuru)
        .input("Sinif", sql.NVarChar, data.Sinif)
        .input("OgretmenID", sql.Int, data.OgretmenID)

        .input("Fotograf", sql.NVarChar, data.photo)




        .query(`
            INSERT INTO [dbo].[odev]
           ([DersAdi]
           ,[Konu]
           ,[Aciklama]
           ,[TeslimTarihi]
           ,[puan]
           ,[durum]
           ,[Fotograf]
           ,[tarih]
           ,[OgrenciID]
           ,[KayitTuru]
           ,[Sinif]
           ,[OgretmenID])
     VALUES
           (
             @DersAdi,
             @Konu,
             @Aciklama,
             @TeslimTarihi,
             @puan,
             @durum,
             @Fotograf,
             GETDATE(),
             (SELECT OgrenciID FROM [dbo].[Ogrenciler] WHERE OgrenciNumara = @OgrenciNo),
             @KayitTuru,
             @Sinif,
             @OgretmenID
           );
          `)

      return true

    } catch (error) {
      console.log(error)
      throw new Error(`SQL GET HATASI ${error.message}`)
    }
  },





  async homeworkget(data) {
    try {

      let result = await new sql.Request()
        .input("OgretmenID", sql.Int, data.OgretmenID)


        .query(`
      SELECT od.*, o.OgrenciNumara
      FROM [demo].[dbo].[odev] od 
	  left join Ogrenciler o on o.OgrenciId = od.OgrenciID
	  
	  where od.OgretmenID = @OgretmenID

      `)

      return result.recordset

    } catch (error) {
      throw new Error(`SQL GET HATASI ${error.message}`)
    }
  },











  async homeworkdelete(data) {
    try {

      let result = await new sql.Request()
        .input("id", sql.Int, data.id)


        .query(`
        delete
          FROM [demo].[dbo].[odev] where id = @id

          delete from odevPuanları where odevID = @id


      `)

      return true

    } catch (error) {
      throw new Error(`SQL GET HATASI ${error.message}`)
    }
  },




  async exam(data) {
    try {

      let result = await new sql.Request()
        .input("Tarih", sql.Date, data.Tarih)
        .input("SinavSuresi", sql.NVarChar, data.SinavSuresi)
        .input("Ders", sql.NVarChar, data.Ders)
        .input("Puan", sql.NVarChar, data.Puan)
        .input("Sinif", sql.NVarChar, data.Sinif)
        .input("SinavAdi", sql.NVarChar, data.SinavAdi)
        .input("Aciklama", sql.NVarChar, data.Aciklama)
        .input("OgretmenID", sql.Int, data.OgretmenID)




        .query(`
 
            INSERT INTO [dbo].[sinavlar]
                  ([Tarih]
                  ,[SinavSuresi]
                  ,[Ders]
                  ,[Puan]
                  ,[Sinif]
                  ,[SinavAdi]
                  ,[Aciklama]
                  ,[OgretmenID])
            VALUES
                  (@Tarih
                  ,@SinavSuresi
                  ,@Ders
                  ,@Puan
                  ,@Sinif
                  ,@SinavAdi
                  ,@Aciklama
                  ,@OgretmenID)


      `)

      return true

    } catch (error) {
      throw new Error(`SQL GET HATASI ${error.message}`)
    }
  },






  async examget(data) {
    try {

      let result = await new sql.Request()

        .input("OgretmenID", sql.Int, data.OgretmenID)
        .query(`
            SELECT *
            FROM [demo].[dbo].[sinavlar] where OgretmenID = @OgretmenID
              `)

      return result.recordset

    } catch (error) {
      throw new Error(`SQL GET HATASI ${error.message}`)
    }
  },







  async examdelete(data) {
    try {

      let result = await new sql.Request()

        .input("id", sql.Int, data.SinavID)
        .query(`
            delete FROM [demo].[dbo].[sinavlar] where id = @id
delete from notlar where SinavId = @id
              `)

      return true

    } catch (error) {
      throw new Error(`SQL GET HATASI ${error.message}`)
    }
  },



  async point(data) {
    try {

      let result = await new sql.Request()

        .input("id", sql.Int, data.id)
        .query(`
              SELECT  s.id,o.AdSoyad, o.OgrenciId, o.OgrenciNumara, n.puan
              FROM [demo].[dbo].[sinavlar] s
              inner join [demo].[dbo].[Ogrenciler]  o on s.Sinif = o.Sinif
              left join [demo].[dbo].[notlar] n on s.id = n.SinavId and o.OgrenciId = n.OgrenciId
              where s.id = @id
              `)

      return result.recordset

    } catch (error) {
      throw new Error(`SQL GET HATASI ${error.message}`)
    }
  },


  async pointadd(data) {
    try {
      console.log("repodan gelen",data)
      let result = await new sql.Request()

        .input("puan", sql.Int, data.puan)
        .input("OgrenciId", sql.Int, data.OgrenciId)
        .input("SinavId", sql.Int, data.SinavId)

        .query(`
    MERGE [dbo].[notlar] AS target
    USING (SELECT @OgrenciId AS OgrenciId, @SinavId AS SinavId, @puan AS puan) AS source
    ON (target.OgrenciId = source.OgrenciId AND target.SinavId = source.SinavId)
    WHEN MATCHED THEN
        UPDATE SET puan = source.puan
    WHEN NOT MATCHED THEN
        INSERT (puan, OgrenciId, SinavId)
        VALUES (source.puan, source.OgrenciId, source.SinavId);

              `)

      return true

    } catch (error) {
      console.log(error)
      throw new Error(`SQL GET HATASI ${error.message}`)
    }
  },




  async deletee(data) {
    try {
      console.log(data)
      let result = await new sql.Request()

        .input("OgretmenID", sql.Int, data.OgretmenID)
        .query(`

 BEGIN TRANSACTION;

                    -- 1. notlar tablosu
                    DELETE FROM [demo].[dbo].[DersProgrami]
                    WHERE OgretmenID = @OgretmenID;

                    -- 2. odev tablosu
                    DELETE FROM [demo].[dbo].[Ogretmenler]
                    WHERE OgretmenID = @OgretmenID;

             

                    COMMIT TRANSACTION;
  
              `)

      return true

    } catch (error) {
      console.log(error)
      throw new Error(`SQL GET HATASI ${error.message}`)
    }
  },









  async classdeletee(data) {
    try {
      console.log(data)
      let result = await new sql.Request()

        .input("Sinif", sql.NVarChar, data.Sinif)
        .query(`
delete
  FROM [demo].[dbo].[Siniflar] where SinifAdi = @Sinif
  
              `)

      return true

    } catch (error) {
      console.log(error)
      throw new Error(`SQL GET HATASI ${error.message}`)
    }
  },



  async attendanceRapor(data) {
    try {

      let result = await new sql.Request()

        .input("Sinif", sql.NVarChar, data.Sinif)
        .input("baslangictarih", sql.Date, data.baslangictarih)
        .input("bitistarih", sql.Date, data.bitistarih)


        .query(`

WITH RankedStudents AS (
    SELECT
        y.tarih,
        y.Ders,
        y.DersSaati,
        y.Gun,
        y.Sinif,
        dk.kazanim,
        o.OgrenciNumara,
        TRY_CAST(o.OgrenciNumara AS INT) AS SıralamaNumarası, -- Sayısal dönüşüm burada yapılıyor
        y.durum
    FROM yoklama y
    LEFT JOIN DersKazanimlari dk
        ON dk.tarih = y.tarih AND dk.ProgramID = y.ProgramID
    LEFT JOIN Ogrenciler o
        ON o.OgrenciId = y.OgrenciID
    WHERE
        y.Sinif = @Sinif
        AND y.tarih >= @baslangictarih
        AND y.tarih <= @bitistarih
)
SELECT
    tarih,
    Ders,
    DersSaati,
    Gun,
    Sinif,
    kazanim,
    -- Sayısal olarak sıralanmış öğrenci numaralarını birleştir
    COALESCE(
        STRING_AGG(CASE WHEN durum = 0 THEN OgrenciNumara ELSE NULL END, ', ') 
        WITHIN GROUP (ORDER BY SıralamaNumarası), -- Buradaki sayısal sütunu kullan
        'TAM'
    ) AS OgrenciNumara
FROM RankedStudents
GROUP BY
    tarih,
    Ders,
    DersSaati,
    Gun,
    Sinif,
    kazanim
ORDER BY
    tarih, DersSaati;

  
              `)

      return result.recordset

    } catch (error) {
      console.log(error)
      logyaz(error)
      throw new Error(`SQL GET HATASI ${error.message}`)
    }
  },


  async pointRapor(data) {
    try {

      let result = await new sql.Request()

        .input("id", sql.Int, data.id)
        .query(`
              SELECT  s.id,o.AdSoyad, o.OgrenciId, o.OgrenciNumara, n.puan
              FROM [demo].[dbo].[sinavlar] s
              inner join [demo].[dbo].[Ogrenciler]  o on s.Sinif = o.Sinif
              left join [demo].[dbo].[notlar] n on s.id = n.SinavId and o.OgrenciId = n.OgrenciId
              where s.id = @id
              `)

      return result.recordset

    } catch (error) {
      throw new Error(`SQL GET HATASI ${error.message}`)
    }
  },

  async mesajGetV2(data) {
    try {

      let result = await new sql.Request()

        .input("id", sql.NVarChar, data.id)

        .query(`
                    select ms.mesaj, ms.gonderenID, ms.AliciID, ms.tarih , o.AdSoyad ,  o.Sinif , o.OgrenciNumara  from mesaj ms
                    inner join Ogrenciler o on o.OgrenciId = ms.gonderenID

                    where ms.aliciTipi = 'teacher' and ms.AliciID = @id and gonderenTipi = 'student'

                    select ms.mesaj, ms.gonderenID, ms.AliciID, ms.tarih  , o.AdSoyad ,  o.Sinif , o.OgrenciNumara 

                    from mesaj ms

                    inner join Ogrenciler o on o.OgrenciId = ms.AliciID

                    where ms.gonderenID = @id and ms.aliciTipi != 'Sinif' and ms.gonderenTipi  = 'teacher'

                    select  ms.mesaj, ms.gonderenID, ms.AliciID, ms.tarih , ms.AliciID as AdSoyad , '-' Sinif , '-' OgrenciNumara    from mesaj ms  where ms.aliciTipi = 'Sinif'  and ms.gonderenID = @id



select  ms.mesaj, ms.gonderenID, ms.AliciID, ms.tarih , 'Okul Yönetimi' AdSoyad , '-' Sinif , '-' OgrenciNumara    from mesaj ms 
where (ms.aliciTipi = 'teacher' or ms.aliciTipi = 'allteacher' ) and ms.gonderenTipi = 'admin' and (ms.AliciID = @id or ms.AliciID = '-')
                  `)


      return result.recordsets

    } catch (error) {
      throw new Error(`SQL GET HATASI ${error.message}`)
    }
  },


  async mesajget(data) {
    try {

      let result = await new sql.Request()

        .input("id", sql.NVarChar, data.id)

        .query(`
          SELECT 
          
          ms.mesaj,ms.gonderenTipi, ms.tarih,

            CASE 
                  WHEN ms.gonderenTipi = 'student' THEN o.AdSoyad
                  WHEN ms.gonderenTipi = 'admin'   THEN 'Okul Yönetimi'
              END AS AdSoyad,

              CASE 
                  WHEN ms.gonderenTipi = 'student' THEN o.Sinif
                  WHEN ms.gonderenTipi = 'admin'   THEN '-'
              END AS Sinif,

            CASE 
                  WHEN ms.gonderenTipi = 'student' THEN o.OgrenciNumara
                  WHEN ms.gonderenTipi = 'admin'   THEN '-'
              END AS OgrenciNumara



            FROM [demo].[dbo].[mesaj] ms
            left join [demo].[dbo].[Ogrenciler] o on ms.gonderenTipi = 'student' and ms.gonderenID = o.OgrenciId


            where ms.aliciTipi = 'allteacher' or (ms.aliciTipi = 'teacher' and ms.AliciID = @id)


  
              `)

      return result.recordset

    } catch (error) {
      throw new Error(`SQL GET HATASI ${error.message}`)
    }
  },

  async homeworkpoint(data) {
    try {

      let result = await new sql.Request()

        .input("id", sql.Int, data.id)
        .input("KayitTuru", sql.Int, data.KayitTuru)

        .query(`
                IF (SELECT KayitTuru FROM [demo].[dbo].[odev] WHERE id = @id) = 0
                BEGIN
                    SELECT ogrenci.AdSoyad,ogrenci.OgrenciNumara, odev.TeslimTarihi, odev.id, ogrenci.OgrenciId, p.puan , odev.KayitTuru
                    FROM [demo].[dbo].[odev] odev
                    INNER JOIN [demo].[dbo].[Ogrenciler] ogrenci ON ogrenci.Sinif = odev.Sinif
                    LEFT JOIN [demo].[dbo].[odevPuanları] p ON odev.id = p.odevID AND p.OgrenciID = ogrenci.OgrenciId
                    WHERE odev.id = @id
                END
                ELSE
                BEGIN
                    SELECT ogrenci.AdSoyad,ogrenci.OgrenciNumara, odev.TeslimTarihi, odev.id, ogrenci.OgrenciId, p.puan , odev.KayitTuru
                    FROM [demo].[dbo].[odev] odev
                    INNER JOIN [demo].[dbo].[Ogrenciler] ogrenci ON ogrenci.OgrenciId = odev.OgrenciID
                    LEFT JOIN [demo].[dbo].[odevPuanları] p ON odev.id = p.odevID AND p.OgrenciID = ogrenci.OgrenciId
                    WHERE odev.id = @id
                END
              `)

      return result.recordset

    } catch (error) {
      throw new Error(`SQL GET HATASI ${error.message}`)
    }
  },






  async homeworkpointadd(data) {
    try {

      let result = await new sql.Request()

        .input("odevID", sql.Int, data.odevID)
        .input("puan", sql.NVarChar, data.puan)
        .input("OgrenciID", sql.Int, data.OgrenciID)

        .query(`
                MERGE [dbo].[odevPuanları] AS target
                USING (SELECT @odevID AS odevID, @OgrenciID AS OgrenciID, @puan AS puan) AS source
                    ON target.odevID = source.odevID AND target.OgrenciID = source.OgrenciID
                WHEN MATCHED THEN
                    UPDATE SET puan = source.puan
                WHEN NOT MATCHED THEN
                    INSERT (odevID, puan, OgrenciID)
                    VALUES (source.odevID, source.puan, source.OgrenciID);
              `)

      return result.recordset

    } catch (error) {
      throw new Error(`SQL GET HATASI ${error.message}`)
    }
  },

  async studentRapor(data) {
    try {

      let result = await new sql.Request()
        .input("OgrenciID", sql.Int, data.OgrenciID)

        .query(`
        SELECT DISTINCT 
    dp.Ders,  
    s.Sinif, 
    s.Tarih,
    n.puan,
    o.AdSoyad,
    o.OgrenciNumara,
    s.SinavAdi
FROM [demo].[dbo].[DersProgrami] dp 
LEFT JOIN sinavlar s 
    ON s.Ders = dp.Ders
LEFT JOIN notlar n 
    ON n.SinavId = s.id 
   AND n.OgrenciId = @OgrenciID
LEFT JOIN Ogrenciler o 
    ON o.OgrenciId = n.OgrenciId



    SELECT og.AdSoyad,og.OgrenciNumara, o.DersAdi, o.TeslimTarihi,op.puan
  FROM [demo].[dbo].[odevPuanları] op
  inner join odev o on o.id = op.odevID
  inner join Ogrenciler og on og.OgrenciId = op.OgrenciID

  where op.OgrenciID = @OgrenciID


              `)

      console.log(result.recordsets[1])
      return [result.recordsets[0], result.recordsets[1]]

    } catch (error) {
      throw new Error(`SQL GET HATASI ${error.message}`)
    }
  },



  async homeworkNotfication(data) {
    try {
      let result = await new sql.Request()
        .input("id", sql.Int, data.OgrenciNumara)
        .input("OgretmenID", sql.Int, data.OgretmenID)

        .query(`
        


        select fc.fcm_token,o.AdSoyad, og.AdSoyad as OgretmenAdi from Ogrenciler o
        inner join FCM_TOKEN fc on fc.user_id = o.OgrenciId and user_type = 'student'

		    left join Ogretmenler og on og.OgretmenID = @OgretmenID
        where o.OgrenciNumara = @id
        
        `)

      return result.recordset
    } catch (error) {
      logyaz(error)
      throw new Error("Sql Hatası")
    }
  },

  async homeworkNotfication2(data) {
    try {
      let result = await new sql.Request()
        .input("Sinif", sql.NVarChar, data.Sinif)
        .input("OgretmenID", sql.Int, data.OgretmenID)

        .query(`
        
  select fc.fcm_token,o.AdSoyad, og.AdSoyad as OgretmenAdi from Ogrenciler o
        inner join FCM_TOKEN fc on fc.user_id = o.OgrenciId
		left join Ogretmenler og on og.OgretmenID = @OgretmenID
        where o.Sinif = @Sinif
        
        `)

      return result.recordset


    } catch (error) {
      throw new Error("Sql Hatası")
    }
  }
  ,
  async yoklamaUpdate(query, data) {
    try {
      console.log(query)
      let result = await new sql.Request()
        .input("ProgramID", sql.Int, data.ProgramID)
        .input("tarih", sql.Date, data.tarih)
        .query(query)

      return result
    } catch (error) {
      console.log(error)
      throw new Error("sql baba gitti")
    }
  },

  async classGet() {
    try {
      let result = await new sql.Request()
        .query(`select * from [dbo].[Siniflar] order by SinifAdi`)
      return result.recordset
    } catch (error) {
      throw new Error("SQL Hatası")
    }
  },


  async lessonAssignment(data) {
    try {
      let result = await new sql.Request()
        .input("OgretmenId", sql.Int, data.OgretmenId)
        .input("ProgramId", sql.Int, data.ProgramId)
        .input("tarih", sql.Date, data.tarih)

        .query(`
              
              INSERT INTO [dbo].[gunlukDersler]
           ([OgretmenId]
           ,[ProgramId]
           ,[tarih])
     VALUES
           (@OgretmenId
           ,@ProgramId
           ,@tarih
           
           )
              `)
      return true
    } catch (error) {
      throw new Error("SQL Hatası")
    }
  },

  async lessonAssignmentGet(data) {
    try {
      let result = await new sql.Request()
        .input("tarih", sql.Date, data.tarih)

        .query(`
              
              select gd.id, gd.ProgramId, gd.tarih

, dp.Gun, dp.DersSaati, dp.Ders, dp.Sinif,

dp.OgretmenID as AlinanOgretmenId , og.AdSoyad as AlinanOgretmenAd

, gd.OgretmenId as atananOgretmenId, o.AdSoyad as atananOgretmenAd



from gunlukDersler gd

left join DersProgrami dp on dp.ProgramId = gd.ProgramId
left join Ogretmenler o on o.OgretmenID = gd.OgretmenId
left join Ogretmenler og on og.OgretmenID = dp.OgretmenId



where gd.tarih >= @tarih
order by gd.tarih desc
           
           
              `)
      return result.recordset
    } catch (error) {
      throw new Error("SQL Hatası")
    }
  },


  async lessonAssignmentDelete(data) {
    try {
      let result = await new sql.Request()
        .input("id", sql.Int, data.id)


        .query(`
              delete from gunlukDersler where id = @id
              `)
      return true
    } catch (error) {
      throw new Error("SQL Hatası")
    }
  },






  async attendanceIdareRapor(data) {
    try {

      let result = await new sql.Request()
        .input("tarih", sql.Date, data.tarih)


        .query(`


          -- 1. Adım: "OgrenciGunlukDurum" adında bir geçici sonuç seti (CTE) tanımlıyoruz.
;WITH OgrenciGunlukDurum AS (
    SELECT
        y.tarih,
        o.OgrenciNumara,
        o.OgrenciId,
		o.AdSoyad,
		o.Sinif,

        
        -- Öğleden Önce Yok mu? (Sabah 08:00 - 11:59 arası)
        -- Eğer 'durum = 0' (Yok) olan ve saati '12:00'den küçük bir kaydı varsa 1, yoksa 0 döner.
        MAX(CASE 
            WHEN y.durum = 0 AND LEFT(y.DersSaati, 5) < '12:00' THEN 1 
            ELSE 0 
        END) AS AbsentMorning,
        
        -- Öğleden Sonra Yok mu? (12:00 ve sonrası)
        -- Eğer 'durum = 0' (Yok) olan ve saati '12:00'den büyük veya eşit bir kaydı varsa 1, yoksa 0 döner.
        MAX(CASE 
            WHEN y.durum = 0 AND LEFT(y.DersSaati, 5) >= '12:00' THEN 1 
            ELSE 0 
        END) AS AbsentAfternoon,
        
        -- Hiç Geç Kaldı mı?
        -- Eğer 'durum = 2' (Geç) olan bir kaydı varsa 1, yoksa 0 döner.
        MAX(CASE 
            WHEN y.durum = 2 THEN 1 
            ELSE 0 
        END) AS WasLate,
        
        -- Hiç Yok Yazıldı mı? (Sabah veya Öğlen fark etmeksizin)
        -- Eğer 'durum = 0' (Yok) olan bir kaydı varsa 1, yoksa 0 döner.
        MAX(CASE 
            WHEN y.durum = 0 THEN 1 
            ELSE 0 
        END) AS WasAbsent
        
    FROM
        yoklama y
    INNER JOIN
        Ogrenciler o ON o.OgrenciId = y.OgrenciID
    WHERE
        y.tarih = @tarih and y.durum != 1 -- İlgili tarihi filtreliyoruz
    GROUP BY
        y.tarih,
        o.OgrenciId,
        o.OgrenciNumara,
		o.AdSoyad,
		o.Sinif
)
-- 2. Adım: Yukarıdaki CTE'den (OgrenciGunlukDurum) verileri çekip nihai mantığı kuruyoruz.
SELECT
    d.tarih,
    d.OgrenciNumara,
	d.AdSoyad,
	d.Sinif,
    CASE
        -- 1. Kural: Hem sabah (AbsentMorning=1) hem de öğleden sonra (AbsentAfternoon=1) yok yazılmışsa
        WHEN d.AbsentMorning = 1 AND d.AbsentAfternoon = 1 THEN 'Tam Gün Yok'
        
        -- 2. Kural: Sadece sabah VEYA sadece öğleden sonra yok yazılmışsa (WasAbsent=1)
        -- (NOT: Önceki 'Tam Gün' kuralı çalışmadıysa buraya gelir)
        WHEN d.WasAbsent = 1 THEN 'Yarım Gün Yok' 
        
        -- 3. Kural: Hiç yok yazılmamışsa (WasAbsent=0) ama geç kalmışsa (WasLate=1)
        WHEN d.WasAbsent = 0 AND d.WasLate = 1 THEN 'Geç'
        
        -- 4. Kural: Yukarıdakilerin hiçbiri değilse (yani hiç yok yazılmadı ve hiç geç kalmadı)
        ELSE 'Var'
    END AS GunlukDurum
FROM
    OgrenciGunlukDurum d
ORDER BY
    d.Sinif;

      `)

      return result.recordset

    } catch (error) {
      throw new Error(`SQL GET HATASI ${error.message}`)
    }
  },




  async attandanceWarning(data) {
    try {
      let result = await new sql.Request()
        .input("tarih", sql.Date, data.tarih)
        .input("Gun", sql.NVarChar, data.Gun)
        .input("DersSaati", sql.NVarChar, data.DersSaati)

        .query(`
                WITH sonuc AS(
                  SELECT 
                  dp.*,
                CASE 
                      WHEN y.ProgramID IS NOT NULL THEN 1 
                      ELSE 0 
                  END AS YoklamaVar
              FROM DersProgrami dp
              LEFT JOIN yoklama y 
                  ON y.ProgramID = dp.ProgramID 
                  AND y.tarih = @tarih
              WHERE dp.Gun = @Gun and dp.DersSaati = @DersSaati
              ) select s.*, fcm.fcm_token from sonuc s 
              inner join FCM_TOKEN fcm on fcm.user_type = 'teacher' and fcm.[user_id] = s.OgretmenID

              where s.YoklamaVar = 0 
              `)
      return result.recordset
    } catch (error) {
      throw new Error("SQL Hatası")
    }
  },


  async pointAddNotfication(data) {
    try {
      let result = await new sql.Request()
        .input("SinavId", sql.Int, data.SinavId)
        .input("OgrenciId", sql.Int, data.OgrenciId)
   

        .query(`
     select o.AdSoyad, s.Ders,fcm.fcm_token from Ogrenciler o 
	  inner join sinavlar s on s.id = @SinavId
	  left join FCM_TOKEN fcm on fcm.user_id =  @OgrenciId and fcm.user_type = 'student'

	  where o.OgrenciId = @OgrenciId

              `)
      return result.recordset
    } catch (error) {
      throw new Error("SQL Hatası")
    }
  },



    async lessonAssignmentNotfication(data) {
    try {
      let result = await new sql.Request()
        .input("ProgramId", sql.Int, data.ProgramId)
        .input("OgretmenId", sql.Int, data.OgretmenId)
   

        .query(`
            select fc.fcm_token, dp.DersSaati, dp.Ders, dp.Gun, dp.Sinif from FCM_TOKEN fc
      inner join DersProgrami dp on dp.ProgramID = @ProgramId

      where fc.user_type = 'teacher' and fc.[user_id] = @OgretmenId

              `)
      return result.recordset
    } catch (error) {
      throw new Error("SQL Hatası")
    }
  },




}


module.exports = TeacherRepository