const sql = require("mssql")



let scheduleRepository = {
    async scheduleCreate(data) {
        try {
            let result = await new sql.Request()
                .input("Gun", sql.NVarChar, data.Gun)
                .input("DersSaati", sql.NVarChar, data.DersSaati)
                .input("OgretmenID", sql.Int, data.OgretmenID)
                .input("Sinif", sql.NVarChar, data.Sinif)
                .input("Ders", sql.NVarChar, data.Ders)
                .query(`
     
DECLARE @NewID INT;

-- Önce aynı kayıt varsa sil
DELETE FROM [dbo].[DersProgrami]
WHERE [Gun] = @Gun
  AND [DersSaati] = @DersSaati
  AND [OgretmenID] = @OgretmenID;

-- Sonra yeni kaydı ekle
INSERT INTO [dbo].[DersProgrami]
           ([Gun]
           ,[DersSaati]
           ,[OgretmenID]
           ,[Sinif]
           ,[Ders])
     VALUES
           (@Gun
           ,@DersSaati
           ,@OgretmenID
           ,@Sinif
           ,@Ders);

-- Yeni eklenen ID'yi al
SET @NewID = SCOPE_IDENTITY();

-- Dışarıya döndür
SELECT @NewID AS ProgramID;


                `)
            console.log(result.recordset[0].ProgramID)
            return result.recordset[0].ProgramID

        } catch (error) {
            console.log(error)
            throw new Error(`Sql Kayıt Hatası ${error.message}`)
        }
    },



    async getTeacher(data) {
        try {
            let result = await new sql.Request()
                .input("id", sql.Int, data.id)
                .input("tarih", sql.NVarChar, data.tarih)
                .input("gun", sql.NVarChar, data.gun)


                .query(`
SELECT 
    dp.*, 
    s.Derslik,

    CASE 
        WHEN EXISTS (
            SELECT 1 
            FROM [dbo].[yoklama] y
            WHERE y.ProgramID = dp.ProgramID
            AND y.tarih = @tarih
        )
        THEN 
            CASE 
                WHEN EXISTS (
                    SELECT 1
                    FROM [dbo].[DersKazanimlari] dk
                    WHERE dk.ProgramID = dp.ProgramID
                    AND dk.tarih =  @tarih
                ) THEN 1  -- yoklama var + kazanim var
                ELSE 2     -- yoklama var + kazanim yok
            END
        ELSE 
            CASE 
                WHEN EXISTS (
                    SELECT 1
                    FROM [dbo].[DersKazanimlari] dk
                    WHERE dk.ProgramID = dp.ProgramID
                    AND dk.tarih =  @tarih
                ) THEN 0  -- yoklama yok ama kazanim var (istersen bunu 0 yapabiliriz)
                ELSE 0     -- yoklama yok + kazanim yok
            END
    END AS durum



FROM [dbo].[DersProgrami] dp
INNER JOIN [dbo].[Siniflar] s 
    ON dp.Sinif = s.SinifAdi

WHERE dp.OgretmenID = @id AND dp.Gun = @gun



UNION ALL



select 
dp.*, 
s.Derslik,
 CASE 
        WHEN EXISTS (
            SELECT 1 
            FROM [dbo].[yoklama] y
            WHERE y.ProgramID = dp.ProgramID
            AND y.tarih = @tarih
        )
        THEN 
            CASE 
                WHEN EXISTS (
                    SELECT 1
                    FROM [dbo].[DersKazanimlari] dk
                    WHERE dk.ProgramID = dp.ProgramID
                    AND dk.tarih =  @tarih
                ) THEN 1  -- yoklama var + kazanim var
                ELSE 2     -- yoklama var + kazanim yok
            END
        ELSE 
            CASE 
                WHEN EXISTS (
                    SELECT 1
                    FROM [dbo].[DersKazanimlari] dk
                    WHERE dk.ProgramID = dp.ProgramID
                    AND dk.tarih =  @tarih
                ) THEN 0  -- yoklama yok ama kazanim var (istersen bunu 0 yapabiliriz)
                ELSE 0     -- yoklama yok + kazanim yok
            END
    END AS durum

from gunlukDersler gp
left join DersProgrami dp on dp.ProgramID = gp.ProgramId
left join Siniflar s on s.SinifAdi = dp.Sinif 

 where gp.OgretmenId =  @id and gp.tarih = @tarih

                `)
            return result.recordset
        } catch (error) {
            throw new Error("SQL GET HATASI")
        }

    },














    async scheduleDelete(data) {
        try {
            await new sql.Request()
                .input("id", sql.Int, data.id)
                .query(`
                DELETE
                    FROM [dbo].[DersProgrami]
                    WHERE ProgramID = @id
                `)
            return true
        } catch (error) {
            throw new Error("SQL DELETE HATASI")
        }
    },
    async gain(data) {
        try {
            console.log(data)
            data.Sinif = data.Sinif[0]
            let result = await new sql.Request()
                .input("Ders", sql.NVarChar, data.Ders)
                .input("Sinif", sql.NVarChar, data.Sinif)

                .query(`
              
              SELECT *
                FROM [dbo].[Kazanim]
                WHERE Ders = @Ders 
                AND Sinif = @Sinif
                ORDER BY Hafta;

                `)
            return result.recordset
        } catch (error) {
            throw new Error("SQL DELETE HATASI")
        }
    },
    async gainadd(data) {
        try {

            let result = await new sql.Request()
                .input("kazanim", sql.NVarChar, data.kazanim)
                .input("Sinif", sql.NVarChar, data.Sinif)
                .input("ProgramID", sql.Int, data.ProgramID)


                .query(`


                MERGE [dbo].[DersKazanimlari] AS target
USING (
    SELECT 
        @kazanim AS kazanim, 
        @Sinif AS Sinif, 
        CAST(GETDATE() AS DATE) AS tarih,  -- sadece gün bazında kontrol
        @ProgramID AS ProgramID
) AS source
ON (
    target.Sinif = source.Sinif 
    AND target.ProgramID = source.ProgramID 
    AND CAST(target.tarih AS DATE) = source.tarih
)
WHEN MATCHED THEN
    UPDATE SET kazanim = source.kazanim
WHEN NOT MATCHED THEN
    INSERT (kazanim, Sinif, tarih, ProgramID)
    VALUES (source.kazanim, source.Sinif, source.tarih, source.ProgramID);


                `)
            return true
        } catch (error) {
            throw new Error("SQL DELETE HATASI")
        }
    },



    async getclass(data) {
        try {

            let result = await new sql.Request()
                .input("Sinif", sql.NVarChar, data.Sinif)
                .input("OgrenciId", sql.NVarChar, data.OgrenciId)

                .query(`

                SELECT dp.Gun, dp.DersSaati, dp.Sinif, Dp.Ders, o.AdSoyad, s.Derslik

            FROM [dbo].[DersProgrami] dp 

            inner join [dbo].[Ogretmenler] o on dp.OgretmenID = o.OgretmenID 

            inner join [dbo].[Siniflar] s on s.SinifAdi = dp.Sinif

            left join kursOgrencileri ko on ko.OgrenciId = @OgrenciId

            where dp.Sinif = @Sinif or dp.Sinif = ko.sinifAdi

                `)
            return result.recordset
        } catch (error) {
            throw new Error("SQL DELETE HATASI")
        }
    },




    async dersler(data) {
        try {

            let result = await new sql.Request()
                .query(`
                        SELECT *
                        FROM [dbo].[Dersler] order by isim
                `)
            return result.recordset
        } catch (error) {
            throw new Error("SQL DELETE HATASI")
        }
    },


    async schools(data) {
        try {

            let result = await new sql.Request()
                .query(`
                        SELECT *
                        FROM [dbo].[Okullar]
                `)
            return result.recordset
        } catch (error) {
            throw new Error("SQL DELETE HATASI")
        }
    },

    async lessonadd(data) {
        try {

            let result = await new sql.Request()
                .input("lesson", sql.NVarChar, data.lesson)
                .query(`
                INSERT INTO [dbo].[Dersler]
                    ([isim])
                VALUES
                (@lesson)
                `)
            return true
        } catch (error) {

            throw new Error("SQL DELETE HATASI")
        }
    },


    async lessondelete(data) {
        try {

            let result = await new sql.Request()
                .input("lesson", sql.NVarChar, data.lesson)
                .query(`
                    DELETE
                    FROM [dbo].[Dersler] where isim = @lesson
                `)
            return true
        } catch (error) {

            throw new Error("SQL DELETE HATASI")
        }
    },

    async courseStudentAdd(data) {
        try {

            let result = await new sql.Request()
                .input("sinifAdi", sql.NVarChar, data.sinifAdi)
                .input("OgrenciId", sql.Int, data.OgrenciId)

                .query(`
              IF NOT EXISTS (
                    SELECT 1 
                    FROM [dbo].[kursOgrencileri]
                    WHERE sinifAdi = @sinifAdi
                    AND OgrenciId = @OgrenciId
                )
                BEGIN
                    INSERT INTO [dbo].[kursOgrencileri] (sinifAdi, OgrenciId)
                    VALUES (@sinifAdi, @OgrenciId)
                END
                `)
            return true
        } catch (error) {

            throw new Error("SQL DELETE HATASI")
        }
    },

    async courseStudentget(data) {
        try {

            let result = await new sql.Request()
                .input("Sinif", sql.NVarChar, data.SinifAdi)

                .query(`
                   SELECT 
		o.OgrenciNumara, o.AdSoyad,ko.sinifAdi, o.OgrenciId
  FROM [dbo].[kursOgrencileri] ko
   inner join Ogrenciler o on o.OgrenciId = ko.OgrenciId

   where ko.sinifAdi =  @Sinif

                `)
            return result.recordset
        } catch (error) {

            throw new Error("SQL DELETE HATASI")
        }
    },
    async courseStudentDelete(data) {
        try {

            let result = await new sql.Request()
                .input("Sinif", sql.NVarChar, data.SinifAdi)
                .input("OgrenciId", sql.Int, data.OgrenciId)


                .query(`
                  delete
                    FROM [dbo].[kursOgrencileri] where OgrenciId = @OgrenciId and sinifAdi = @Sinif

                `)
            return true
        } catch (error) {

            throw new Error("SQL DELETE HATASI")
        }
    },


    async gaindbadd(data) {
        try {

            let result = await new sql.Request()
                .input("Sinif", sql.NVarChar, data.Sinif)
                .input("kazanim", sql.NVarChar, data.kazanim)
                .input("Ders", sql.NVarChar, data.Ders)
                .input("Hafta", sql.Int, data.Hafta)



                .query(`
                    INSERT INTO [dbo].[Kazanim]
                        ([Sinif]
                        ,[kazanim]
                        ,[Ders]
                        ,[Hafta])
                    VALUES
                        (@Sinif
                        ,@kazanim
                        ,@Ders
                        ,@Hafta)

                `)
            return true
        } catch (error) {

            throw new Error("SQL DELETE HATASI")
        }
    },


    async gaindbdelete(data) {
        try {

            let result = await new sql.Request()

                .input("id", sql.Int, data.id)



                .query(`
                        delete from [dbo].[Kazanim] where id = @id

                `)
            return true
        } catch (error) {

            throw new Error("SQL DELETE HATASI")
        }
    },



    async classGroup(data) {

        try {
            let result = await new sql.Request()
            .input("ProgramID",sql.Int,data.ProgramID)
            .query(`
               select  o.AdSoyad,o.OgrenciNumara,o.Sinif,dp.ProgramID, o.OgrenciId, 
                CASE WHEN gp.ProgramID IS NOT NULL THEN 1 ELSE 0 END AS Status
                
                from Ogrenciler o

                inner join DersProgrami dp on dp.Sinif = o.Sinif

                left join grupOgrencileri gp on gp.ProgramID = dp.ProgramID and o.OgrenciId = gp.OgrenciID

                where dp.ProgramID = @ProgramID ORDER BY TRY_CAST(o.OgrenciNumara AS INT)

                `)

            return result.recordset


        } catch (error) {
            throw new Error("SQL GET HATASI")

        }


    },



    async classGroupAdd(data) {

        try {
            let result = await new sql.Request()
            .input("ProgramID",sql.Int,data.ProgramID)
            .input("OgrenciID",sql.Int,data.OgrenciID)

            .query(`
                DELETE FROM grupOgrencileri WHERE ProgramID = @ProgramID and OgrenciID = @OgrenciID

                INSERT INTO [dbo].[grupOgrencileri]
                        ([ProgramID]
                        ,[OgrenciID])
                    VALUES
                        (@ProgramID
                        ,@OgrenciID)
                               
                `)

            return true


        } catch (error) {
            throw new Error("SQL GET HATASI")

        }


    },

    async classGroupDelete(data) {

        try {
            let result = await new sql.Request()
            .input("ProgramID",sql.Int,data.ProgramID)
            .input("OgrenciID",sql.Int,data.OgrenciID)

            .query(`
                DELETE FROM grupOgrencileri WHERE ProgramID = @ProgramID and OgrenciID = @OgrenciID                               
                `)

            return true


        } catch (error) {
            throw new Error("SQL GET HATASI")

        }


    },
    


    async gainnewget(data) {

        try {
            let result = await new sql.Request()
            .input("Ders",sql.NVarChar,data.Ders)
            .input("Sinif",sql.NVarChar,data.Sinif[0])

            .query(`
                        select * from kazanim2 where Sinif = @Sinif and Ders = @Ders                     
                `)

            return result.recordset


        } catch (error) {
            console.log(error)
            throw new Error("SQL GET HATASI")

        }


    },

     async gaindbnewadd(data) {

        try {
            let result = await new sql.Request()
            .input("baslik",sql.NVarChar,data.baslik)
            .input("Sinif",sql.NVarChar,data.Sinif[0])
            .input("altbaslik",sql.NVarChar,data.altbaslik)
            .input("Ders",sql.NVarChar,data.Ders)


            .query(`
                      INSERT INTO [dbo].[kazanim2]
           ([baslik]
           ,[altbaslik]
           ,[Sinif]
           ,[Ders])
     VALUES
           (@baslik
           ,@altbaslik  
           ,@Sinif
           ,@Ders
           )                
                `)

            return true


        } catch (error) {
            console.log(error)
            throw new Error("SQL GET HATASI")

        }


    },

     async gainnewdelete(data) {

        try {
            let result = await new sql.Request()
            .input("id",sql.Int,data.id)



            .query(`
                delete  from kazanim2 where id = @id
                `)

            return true


        } catch (error) {
            console.log(error)
            throw new Error("SQL GET HATASI")

        }


    },


    async gainRegisteredGet(data){
        try {
            let result = await new sql.Request()
        .input("ProgramID",sql.Int,data.ProgramID)
        .input("tarih",sql.NVarChar,data.tarih)
        .query(`
            select kazanim, ProgramID  from DersKazanimlari where ProgramID = @ProgramID and tarih = @tarih
            `)

            if (result.recordset[0] == undefined) return 0
            return result.recordset[0]
           
        } catch (error) {
            
            console.log(error)
            throw new Error("SQL GET HATASI")
        }

        



        
    }



}


module.exports = scheduleRepository