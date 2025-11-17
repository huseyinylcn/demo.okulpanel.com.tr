const sql = require("mssql")

let StudentRepository = {

    async studentCreate(data) {

        try {
            let result = await new sql.Request()
                .input("Sinif", sql.NVarChar, data.Sinif)
                .input("OgrenciNumara", sql.NVarChar, data.OgrenciNumara)
                .input("AdSoyad", sql.NVarChar, data.AdSoyad)
                .input("TCKimlikNo", sql.NVarChar, data.TCKimlikNo)
                .input("Cinsiyet", sql.Bit, data.Cinsiyet)
                .input("DogumTarihi", sql.Date, data.DogumTarihi)
                .input("AnneAdSoyad", sql.NVarChar, data.AnneAdSoyad)
                .input("BabaAdSoyad", sql.NVarChar, data.BabaAdSoyad)
                .input("VeliDurum", sql.Bit, data.VeliDurum)
                .input("Sag", sql.NVarChar, data.Sag)
                .input("Engel", sql.Bit, data.Engel)
                .input("AnneEgitim", sql.NVarChar, data.AnneEgitim)
                .input("BabaEgitim", sql.NVarChar, data.BabaEgitim)
                .input("AnneMeslek", sql.NVarChar, data.AnneMeslek)
                .input("BabaMeslek", sql.NVarChar, data.BabaMeslek)
                .input("SuregenRahatsizlik", sql.NVarChar, data.SuregenRahatsizlik)
                .input("AylikGelir", sql.NVarChar, data.AylikGelir)
                .input("AnneTel", sql.NVarChar, data.AnneTel)
                .input("BabaTel", sql.NVarChar, data.BabaTel)
                .input("photo", sql.NVarChar, data.photo)

                .query(`
    MERGE INTO [dbo].[Ogrenciler] AS Target
USING (SELECT 
           @Sinif AS Sinif,
           @OgrenciNumara AS OgrenciNumara,
           @AdSoyad AS AdSoyad,
           @TCKimlikNo AS TCKimlikNo,
           @Cinsiyet AS Cinsiyet,
           @DogumTarihi AS DogumTarihi,
           @AnneAdSoyad AS AnneAdSoyad,
           @BabaAdSoyad AS BabaAdSoyad,
           @VeliDurum AS VeliDurum,
           @Sag AS Sag,
           @Engel AS Engel,
           @AnneEgitim AS AnneEgitim,
           @BabaEgitim AS BabaEgitim,
           @AnneMeslek AS AnneMeslek,
           @BabaMeslek AS BabaMeslek,
           @SuregenRahatsizlik AS SuregenRahatsizlik,
           @AylikGelir AS AylikGelir,
           @AnneTel AS AnneTel,
           @BabaTel AS BabaTel,
           @photo AS Fotograf
       ) AS Source
ON Target.TCKimlikNo = Source.TCKimlikNo
WHEN MATCHED THEN
    UPDATE SET 
        Sinif = Source.Sinif,
        OgrenciNumara = Source.OgrenciNumara,
        AdSoyad = Source.AdSoyad,
        Cinsiyet = Source.Cinsiyet,
        DogumTarihi = Source.DogumTarihi,
        AnneAdSoyad = Source.AnneAdSoyad,
        BabaAdSoyad = Source.BabaAdSoyad,
        VeliDurum = Source.VeliDurum,
        Sag = Source.Sag,
        Engel = Source.Engel,
        AnneEgitim = Source.AnneEgitim,
        BabaEgitim = Source.BabaEgitim,
        AnneMeslek = Source.AnneMeslek,
        BabaMeslek = Source.BabaMeslek,
        SuregenRahatsizlik = Source.SuregenRahatsizlik,
        AylikGelir = Source.AylikGelir,
        AnneTel = Source.AnneTel,
        BabaTel = Source.BabaTel,
        Fotograf = Source.Fotograf
WHEN NOT MATCHED THEN
    INSERT ([Sinif],[OgrenciNumara],[AdSoyad],[TCKimlikNo],[Cinsiyet],[DogumTarihi],
            [AnneAdSoyad],[BabaAdSoyad],[VeliDurum],[Sag],[Engel],[AnneEgitim],
            [BabaEgitim],[AnneMeslek],[BabaMeslek],[SuregenRahatsizlik],[AylikGelir],
            [AnneTel],[BabaTel],[Fotograf])
    VALUES (Source.Sinif, Source.OgrenciNumara, Source.AdSoyad, Source.TCKimlikNo, Source.Cinsiyet,
            Source.DogumTarihi, Source.AnneAdSoyad, Source.BabaAdSoyad, Source.VeliDurum, Source.Sag,
            Source.Engel, Source.AnneEgitim, Source.BabaEgitim, Source.AnneMeslek, Source.BabaMeslek,
            Source.SuregenRahatsizlik, Source.AylikGelir, Source.AnneTel, Source.BabaTel, Source.Fotograf);

                        
                        `)
            return true

        } catch (error) {
    
            // if(error.message.includes("UNIQUE KEY ")) console.log("UNIQUE Hatası ")
  
            throw new Error(`kayıt Hatası: ${error.message}`)
        }

    },
    async studentGetAll(){
      
        let result =await new sql.Request()
        .query(`select * from [demo].[dbo].[Ogrenciler]`)
        
        return result.recordset
    },
    async classAdd(data){
        try {
         
            await new sql.Request()
            .input("SinifKodu",sql.NVarChar,data.SinifKodu)
            .input("SinifAdi",sql.NVarChar,data.SinifAdi)
            .input("Derslik",sql.NVarChar,data.Derslik)
            .input("Devre",sql.NVarChar,data.Devre)
            .query(`
                INSERT INTO [dbo].[Siniflar]
           ([SinifKodu]
           ,[SinifAdi]
           ,[Derslik]
           ,[Devre])
     VALUES
           (@SinifKodu
           ,@SinifAdi
           ,@Derslik
           ,@Devre
           )
                `)

            return true

            
        } catch (error) {

             if (error.message.includes("PRIMARY KEY")) {
            return "primer"
        } else if(error.message.includes("UNIQUE KEY")){
            return "unique"
        }else{
throw new Error("SQL Hatası")
        }
           
            
        }

    },
    async classGet(){
        try {
            let result = await new sql.Request()
            .query(`select * from [dbo].[Siniflar] order by SinifAdi`)
            return result.recordset
        } catch (error) {
            throw new Error("SQL Hatası")
        }
    }
,
    async homework(data){
        try {
            console.log(data)
            let result = await new sql.Request()
            .input("OgrenciID", sql.Int,data.OgrenciID)
            .input("Sinif", sql.NVarChar,data.Sinif)

            .query(`
                  select og.OgrenciNumara,o.DersAdi, o.Konu, o.Aciklama, o.TeslimTarihi, o.Fotograf,o.tarih, o.id,o.OgrenciID,o.KayitTuru,o.Sinif,o.OgretmenID,
                    puan.puan, 
     CASE 
          WHEN puan.puan = NULL  THEN 0
                        WHEN puan.puan = 0 THEN 0
                        WHEN  puan.puan > 0  THEN 1
                    END AS durum
                from odev o

                left join [demo].[dbo].[odevPuanları] puan on puan.odevID = o.id and  puan.OgrenciID = @OgrenciID
				left join Ogrenciler og on og.OgrenciId = o.OgrenciID
                where (o.OgrenciID = @OgrenciID or o.Sinif = @Sinif) 

                `
                )
            return result.recordset
        } catch (error) {
            console.log(error)
            throw new Error("SQL Hatası")
        }
    }






,
    async attendance(data){
        try {
            console.log(data)
            let result = await new sql.Request()
            .input("OgrenciID", sql.Int,data.OgrenciID)
            

            .query(`
                    SELECT tarih,OgrenciID,durum, Ders, DersSaati, Gun from yoklama
where OgrenciID = @OgrenciID and durum = 0
                `)
            return result.recordset
        } catch (error) {
            console.log(error)
            throw new Error("SQL Hatası")
        }
    }




,
    async exam(data){
        try {

            let result = await new sql.Request()
            .input("Sinif", sql.NVarChar,data.Sinif)
            

            .query(`
                   SELECT 
                      *
                    FROM [demo].[dbo].[sinavlar] where Sinif = @Sinif


                `)
            return result.recordset
        } catch (error) {
            console.log(error)
            throw new Error("SQL Hatası")
        }
    },






        async point(data){
        try {
            console.log(data)
            let result = await new sql.Request()
            .input("OgrenciId", sql.Int,data.OgrenciId)
            

            .query(`
                SELECT o.AdSoyad, o.OgrenciNumara, n.puan , s.Tarih, s.Ders, s.SinavAdi
                FROM [demo].[dbo].[notlar] n
                inner join [demo].[dbo].[Ogrenciler] o on o.OgrenciId = n.OgrenciId
                inner join [demo].[dbo].[sinavlar] s on s.id = n.SinavId
                where n.OgrenciId = @OgrenciId


                `)
            return result.recordset
        } catch (error) {
            console.log(error)
            throw new Error("SQL Hatası")
        }
    },

        async deletee(data){
        try {
            console.log(data)
            let result = await new sql.Request()
            .input("OgrenciId", sql.Int,data.OgrenciId)
            

            .query(`
                BEGIN TRANSACTION;

                    -- 1. notlar tablosu
                    DELETE FROM [demo].[dbo].[notlar]
                    WHERE OgrenciId = @OgrenciId;

                    -- 2. odev tablosu
                    DELETE FROM [demo].[dbo].[odev]
                    WHERE OgrenciID = @OgrenciId;

                    -- 3. yoklama tablosu
                    DELETE FROM [demo].[dbo].[yoklama]
                    WHERE OgrenciID = @OgrenciId;

                    -- 4. FCM_TOKEN tablosu
                    DELETE FROM [demo].[dbo].[FCM_TOKEN]
                    WHERE user_id = @OgrenciId AND user_type = 'student';

                    -- 5. users tablosu
                    DELETE FROM [demo].[dbo].[users]
                    WHERE id = @OgrenciId AND rol = 3;

                    -- 6. son olarak Ogrenciler tablosu
                    DELETE FROM [demo].[dbo].[Ogrenciler]
                    WHERE OgrenciId = @OgrenciId;

                    COMMIT TRANSACTION;



                `)
            return result.recordset
        } catch (error) {
            console.log(error)
            throw new Error("SQL Hatası")
        }
    },
    async mesajget(data){
        try {

            let result = await new sql.Request()
            .input("Sinif", sql.NVarChar,data.Sinif)
            .input("id", sql.NVarChar,data.id)

            

            .query(`
           SELECT 
 
                ms.mesaj,ms.gonderenTipi, ms.tarih,

                CASE 
                        WHEN ms.gonderenTipi = 'teacher' THEN o.AdSoyad
                        WHEN ms.gonderenTipi = 'admin'   THEN 'Okul Yönetimi'
                    END AS AdSoyad


                FROM [demo].[dbo].[mesaj] ms
                left join [demo].[dbo].[Ogretmenler] o on ms.gonderenTipi = 'teacher' and ms.gonderenID = o.OgretmenID


                    where ms.aliciTipi = 'allstudent' or (ms.aliciTipi = 'student' and ms.AliciID = @id) or ms.AliciID = @Sinif

                `)
            return result.recordset
        } catch (error) {
            console.log(error)
            throw new Error("SQL Hatası")
        }
    },


}


module.exports = StudentRepository