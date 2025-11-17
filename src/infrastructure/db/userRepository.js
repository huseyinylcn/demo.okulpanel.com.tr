const sql = require("mssql")





const userRepository = {
    async login(data) {
        try {
            console.log(data)
            let result = await new sql.Request()
                .input("username", sql.NVarChar, data.username)
                .input("password", sql.NVarChar, data.password)
                .query(`
                EXEC CheckUser @Username = @username, @Password = @password`)
            return result.recordset[0]
        } catch (error) {
            return false
        }
    },
    async createAdmin(data) {
        try {

            await new sql.Request()
                .input("AdSoyad", sql.NVarChar, data.AdSoyad)
                .input("Cinsiyet", sql.NVarChar, data.Cinsiyet)
                .input("DogumTarihi", sql.Date, data.DogumTarihi)
                .input("TCKimlikNo", sql.NVarChar, data.TCKimlikNo)
                .input("Telefon", sql.NVarChar, data.Telefon)
                .input("Eposta", sql.NVarChar, data.Eposta)
                .input("Bolum", sql.NVarChar, data.Bolum)
                .input("Fotograf", sql.NVarChar, data.photo)
                .query(`
                INSERT INTO [dbo].[Yoneticiler]
           ([AdSoyad]
           ,[Cinsiyet]
           ,[DogumTarihi]
           ,[TCKimlikNo]
           ,[Telefon]
           ,[Eposta]
           ,[Bolum]
           ,[Fotograf])
     VALUES
           (@AdSoyad
           ,@Cinsiyet
           ,@DogumTarihi
           ,@TCKimlikNo
           ,@Telefon
           ,@Eposta
           ,@Bolum
           ,@Fotograf
           )
                `)

            return true
        } catch (error) {
            console.log(error)
            throw new Error("SQL HATASI")
        }
    },
    async adminInfo(data) {

        try {
            let result = await new sql.Request()
                .input("id", sql.NVarChar, data.id)
                .query(`
                SELECT 
 *
  FROM [demo].[dbo].[Yoneticiler] where AdminID = @id
                `)
            return result
        } catch (error) {
            throw new Error(error.message)
        }
    },

    async studentInfo(data) {
        try {
            let result = await new sql.Request()
                .input("id", sql.NVarChar, data.id)
                .query(`
               SELECT *
  FROM [demo].[dbo].[Ogrenciler] where OgrenciId = @id

                `)
            return result
        } catch (error) {
            throw new Error(error.message)
        }
    },

    async teacherInfo(data) {

        try {



            let result = await new sql.Request()
                .input("id", sql.NVarChar, data.id)
                .query(`
                SELECT 
      [AdSoyad]
      ,[Cinsiyet]
      ,[DogumTarihi]
      ,[TCKimlikNo]
      ,[Telefon]
      ,[Eposta]
      ,[Bolum]
      ,[Fotograf]
      ,[OgretmenID]
  FROM [demo].[dbo].[Ogretmenler] where OgretmenID = @id
                `)
            return result
        } catch (error) {
            throw new Error(error.message)
        }
    },

    async token(data) {

        try {



            let result = await new sql.Request()
                .input("fcm_token", sql.NVarChar, data.fcm_token)
                .input("user_id", sql.Int, data.user_id)
                .input("user_type", sql.NVarChar, data.user_type)

                .query(`
                        MERGE [dbo].[FCM_TOKEN] AS target
                        USING (VALUES (@user_type, @user_id, @fcm_token)) AS source ([user_type], [user_id], [fcm_token])
                            ON target.[fcm_token] = source.[fcm_token]
                        WHEN MATCHED THEN 
                            UPDATE SET 
                                target.[user_type] = source.[user_type],
                                target.[user_id] = source.[user_id]
                        WHEN NOT MATCHED THEN
                            INSERT ([user_type], [user_id], [fcm_token])
                            VALUES (source.[user_type], source.[user_id], source.[fcm_token]);
                `)
            return true
        } catch (error) {
            throw new Error(error.message)
        }
    },

    async mesaj(data) {

        try {



            let result = await new sql.Request()
                .input("mesaj", sql.NVarChar, data.mesaj)
                .input("gonderenTipi", sql.NVarChar, data.gonderenTipi)
                .input("gonderenID", sql.Int, data.gonderenID)
                .input("aliciTipi", sql.NVarChar, data.aliciTipi)
                .input("AliciID", sql.NVarChar, data.AliciID)



                .query(`

                INSERT INTO [dbo].[mesaj]
                    ([mesaj]
                    ,[gonderenTipi]
                    ,[gonderenID]
                    ,[aliciTipi]
                    ,[AliciID]
                    ,[tarih])
                VALUES
                    (@mesaj
                    ,@gonderenTipi
                    ,@gonderenID
                    ,@aliciTipi
                    ,@AliciID
                    ,GETDATE())



                `)
            return true
        } catch (error) {
            console.log("sAS", error)
            throw new Error(error.message)
        }
    },

    async mesaj1(data) {

        try {



            let result = await new sql.Request()

                .input("gonderenID", sql.Int, data.gonderenID)
                .input("aliciTipi", sql.NVarChar, data.aliciTipi)
                .input("AliciID", sql.NVarChar, data.AliciID)



                .query(`
                    
                    SELECT o.AdSoyad, o.Sinif, o.OgrenciNumara, tk.*
                    FROM [demo].[dbo].[FCM_TOKEN] tk
                    left join [demo].[dbo].[Ogrenciler] o on o.OgrenciId = @gonderenID
                    where tk.[user_type] = @aliciTipi and tk.[user_id] = @AliciID



                `)
            return result.recordset
        } catch (error) {
            console.log(error)
            throw new Error(error.message)
        }
    },




    async mesaj2(data) {

        try {
            let result = await new sql.Request()

                .input("gonderenID", sql.Int, data.gonderenID)
                .input("aliciTipi", sql.NVarChar, data.aliciTipi)
                .input("AliciID", sql.NVarChar, data.AliciID)



                .query(`
                    
                SELECT o.AdSoyad, tk.*
                FROM [demo].[dbo].[FCM_TOKEN] tk
                left join [demo].[dbo].[Ogretmenler] o on o.OgretmenID = @gonderenID
                where tk.[user_type] = @aliciTipi and tk.[user_id] = @AliciID


                `)
            return result.recordset
        } catch (error) {
            console.log(error)
            throw new Error(error.message)
        }
    },


    async mesaj3(data) {

        try {
            let result = await new sql.Request()
                .input("mesaj", sql.NVarChar, data.mesaj)
                .input("gonderenTipi", sql.NVarChar, data.gonderenTipi)
                .input("gonderenID", sql.Int, data.gonderenID)
                .input("aliciTipi", sql.NVarChar, data.aliciTipi)
                .input("AliciID", sql.NVarChar, data.AliciID)



                .query(`
                SELECT  tk.*,og.AdSoyad 
                FROM [demo].[dbo].[FCM_TOKEN] tk
                inner join [demo].[dbo].[Ogretmenler] og on og.OgretmenID = @gonderenID

                left join [demo].[dbo].[Ogrenciler] o on o.Sinif = @AliciID
                where tk.[user_type] = 'student' and tk.[user_id] = o.OgrenciId



                `)
            return result.recordset
        } catch (error) {
            console.log(error)
            throw new Error(error.message)
        }
    },






    async mesaj4(data) {

        try {
            let result = await new sql.Request()
                .input("mesaj", sql.NVarChar, data.mesaj)
                .input("gonderenTipi", sql.NVarChar, data.gonderenTipi)
                .input("gonderenID", sql.Int, data.gonderenID)
                .input("aliciTipi", sql.NVarChar, data.aliciTipi)
                .input("AliciID", sql.NVarChar, data.AliciID)



                .query(`
                    SELECT  tk.*
                    FROM [demo].[dbo].[FCM_TOKEN] tk
                    where tk.[user_type] = 'teacher' 
                    `)
            return result.recordset
        } catch (error) {
            console.log(error)
            throw new Error(error.message)
        }
    },






    async mesaj5(data) {

        try {
            let result = await new sql.Request()
                .input("mesaj", sql.NVarChar, data.mesaj)
                .input("gonderenTipi", sql.NVarChar, data.gonderenTipi)
                .input("gonderenID", sql.Int, data.gonderenID)
                .input("aliciTipi", sql.NVarChar, data.aliciTipi)
                .input("AliciID", sql.NVarChar, data.AliciID)



                .query(`
                    SELECT  tk.*
                    FROM [demo].[dbo].[FCM_TOKEN] tk
                    where tk.[user_type] = 'student' 
                    `)
            return result.recordset
        } catch (error) {
            console.log(error)
            throw new Error(error.message)
        }
    },

    async mesaj6(data) {

        try {
            let result = await new sql.Request()
                .input("mesaj", sql.NVarChar, data.mesaj)
                .input("gonderenTipi", sql.NVarChar, data.gonderenTipi)
                .input("gonderenID", sql.Int, data.gonderenID)
                .input("aliciTipi", sql.NVarChar, data.aliciTipi)
                .input("AliciID", sql.NVarChar, data.AliciID)



                .query(`
                   
                    SELECT  tk.*
                    FROM [demo].[dbo].[FCM_TOKEN] tk
                    left join [demo].[dbo].[Ogrenciler] o on o.Sinif = @AliciID
                    where tk.[user_type] = 'student' and tk.[user_id] = o.OgrenciId

                    `)
            return result.recordset
        } catch (error) {
            console.log(error)
            throw new Error(error.message)
        }
    },





    async mesaj7(data) {

        try {
            let result = await new sql.Request()
                .input("mesaj", sql.NVarChar, data.mesaj)
                .input("gonderenTipi", sql.NVarChar, data.gonderenTipi)
                .input("gonderenID", sql.Int, data.gonderenID)
                .input("aliciTipi", sql.NVarChar, data.aliciTipi)
                .input("AliciID", sql.NVarChar, data.AliciID)



                .query(`
                   
                   SELECT  tk.*, o.OgrenciNumara, o.AdSoyad,o.Sinif
                    FROM [demo].[dbo].[FCM_TOKEN] tk
                    left join [demo].[dbo].[Ogrenciler] o on o.OgrenciId = @gonderenID
                    where tk.[user_type] = 'admin' 


                    `)
            return result.recordset
        } catch (error) {
            console.log(error)
            throw new Error(error.message)
        }
    },





    async mesajget(data) {

        try {
            let result = await new sql.Request()




                .query(`
        
                SELECT 
                
                ms.mesaj,ms.gonderenTipi, ms.tarih,

                CASE 
                        WHEN ms.gonderenTipi = 'teacher' THEN og.AdSoyad
                        WHEN ms.gonderenTipi = 'student'   THEN o.AdSoyad
                    END AS AdSoyad
                    ,  CASE 
                        WHEN ms.gonderenTipi = 'teacher' THEN '-'
                        WHEN ms.gonderenTipi = 'student'   THEN o.Sinif
                    END AS Sinif
                    ,  CASE 
                        WHEN ms.gonderenTipi = 'teacher' THEN '-'
                        WHEN ms.gonderenTipi = 'student'   THEN o.OgrenciNumara
                    END AS OgrenciNumara

                FROM [demo].[dbo].[mesaj] ms


                left join [demo].[dbo].[Ogretmenler] og on ms.gonderenTipi = 'teacher' and ms.gonderenID = og.OgretmenID

                left join [demo].[dbo].[Ogrenciler] o on ms.gonderenTipi = 'student' and ms.gonderenID = o.OgrenciId


                    where ms.aliciTipi = 'admin' 

                    `)
            return result.recordset
        } catch (error) {
            console.log(error)
            throw new Error(error.message)
        }
    },


    async maininfo(data) {

        try {
            let result = await new sql.Request()
                .query(`
                  
                        WITH SinavOrtalama AS (
                            SELECT 
                                s.Ders,
                                s.Sinif,
                                n.SinavId,
                                AVG(TRY_CAST(n.puan AS FLOAT)) AS sinav_ortalama,
                                (SELECT AVG(TRY_CAST(nn.puan AS FLOAT)) 
                                FROM [demo].[dbo].[notlar] nn) AS genel_ortalama
                            FROM [demo].[dbo].[notlar] n
                            LEFT JOIN [demo].[dbo].[sinavlar] s 
                                ON s.id = n.SinavId
                            GROUP BY s.Ders, s.Sinif, n.SinavId
                        ),
                        YoklamaIstatistik AS (
                           SELECT
    -- Bugün gelmeyen benzersiz öğrenci sayısı
    (SELECT COUNT(DISTINCT y.OgrenciID)
     FROM [demo].[dbo].[yoklama] y
     WHERE CAST(y.tarih AS DATE) = CAST(GETDATE() AS DATE)
       AND y.durum = 0) AS gunluk_gelmeyenler,

    -- Son bir ay içindeki toplam devamsızlık yapılan "öğrenci-gün" sayısı
    (SELECT COUNT(*) FROM (
        SELECT DISTINCT y.OgrenciID, CAST(y.tarih AS DATE) AS DevamsizlikGunu -- <-- DÜZELTME BURADA
        FROM [demo].[dbo].[yoklama] y
        WHERE y.tarih BETWEEN DATEADD(MONTH, -1, GETDATE()) AND GETDATE()
          AND y.durum = 0
     ) AS aylik_devamsizlik_gun_sayisi) AS aylik_gelmeyenler,

    -- Toplam öğrenci sayısı
    (SELECT COUNT(*)
     FROM [demo].[dbo].[Ogrenciler]) AS toplam_ogrenci
                        )
                        SELECT 
                            s.Ders,
                            s.Sinif,
                            s.SinavId,
                            s.sinav_ortalama,
                            s.genel_ortalama,
                            y.gunluk_gelmeyenler,
                            y.aylik_gelmeyenler,
                            y.toplam_ogrenci
                        FROM SinavOrtalama s
                        CROSS JOIN YoklamaIstatistik y;


                    `)
            return result.recordset
        } catch (error) {
            console.log(error)
            throw new Error(error.message)
        }
    },
    async passwordUpdate(data) {
        try {
            let result = await new sql.Request()

                .input("password", sql.NVarChar, data.password)
                .input("id", sql.NVarChar, data.id)
                .input("rol", sql.NVarChar, data.rol)

                .query(`
            UPDATE users
            SET 
                [password] = @password
            WHERE id = @id and rol = @rol;
            `)

        } catch (error) {
            throw new Error(error.message)
        }
    },
    async tokendelete(data) {
        try {
            let result = await new sql.Request()

                .input("token", sql.NVarChar, data.token)


                .query(`
           delete
  FROM [demo].[dbo].[FCM_TOKEN] where fcm_token = @token

            `)

        } catch (error) {
            throw new Error(error.message)
        }
    },
    async passwordForget(data) {
        try {
            let result = await new sql.Request()

                .input("email", sql.NVarChar, data.email)


                .query(`
                SELECT 
                    CASE 
                        WHEN EXISTS (SELECT 1 FROM users WHERE username = @email ) 
                        THEN @email 
                        ELSE NULL 
                    END AS username,
                    CASE 
                        WHEN EXISTS (SELECT 1 FROM users WHERE username = @email ) 
                        THEN 1 
                        ELSE 0 
                    END AS durum
                `)

            return result.recordset[0]

        } catch (error) {
            throw new Error(error.message)
        }
    },


    async passwordUpdate2(data) {
        try {
            let result = await new sql.Request()

                .input("password", sql.NVarChar, data.password)
                .input("username", sql.NVarChar, data.username)



                .query(`
            UPDATE users
            SET 
                [password] = @password
            WHERE username = @username and rol = 2;
            `)
            return true

        } catch (error) {
            throw new Error(error.message)
        }
    },



    async passwordForgetSt(data) {
        try {
            let result = await new sql.Request()

                .input("no", sql.NVarChar, data.no)
                .input("tel", sql.NVarChar, data.tel)



                .query(`
                SELECT TOP 1
    CASE 
        WHEN REPLACE(REPLACE(REPLACE(REPLACE(AnneTel,'(', ''),')',''),'-',''),' ' ,'') = @tel
            OR REPLACE(REPLACE(REPLACE(REPLACE(BabaTel,'(', ''),')',''),'-',''),' ' ,'') =  @tel
        THEN 1
        ELSE 0
    END AS Durum,
    CASE 
        WHEN REPLACE(REPLACE(REPLACE(REPLACE(AnneTel,'(', ''),')',''),'-',''),' ' ,'') =  @tel
            THEN REPLACE(REPLACE(REPLACE(REPLACE(AnneTel,'(', ''),')',''),'-',''),' ' ,'')
        WHEN REPLACE(REPLACE(REPLACE(REPLACE(BabaTel,'(', ''),')',''),'-',''),' ' ,'') =  @tel
            THEN REPLACE(REPLACE(REPLACE(REPLACE(BabaTel,'(', ''),')',''),'-',''),' ' ,'')
    END AS Tel
FROM Ogrenciler
WHERE OgrenciNumara = @no;
                `)

            return result.recordset[0]

        } catch (error) {
            throw new Error(error.message)
        }
    },




    async passwordUpdate3(data) {
        try {
            let result = await new sql.Request()

                .input("password", sql.NVarChar, data.password)
                .input("username", sql.NVarChar, data.username)



                .query(`
            UPDATE users
        SET 
        [password] = @password
            WHERE username = @username and rol = 3;
            `)
            return true

        } catch (error) {
            throw new Error(error.message)
        }
    },

    async passwordUpdateAdmin(data) {
        try {
            let result = await new sql.Request()

                .input("password", sql.NVarChar, data.password)
                .input("username", sql.NVarChar, data.username)
                .input("id", sql.Int, data.id)
                .input("rol", sql.Int, data.rol)



                .query(`

                  UPDATE users
SET 
    [password] = @password,
    [username] = @username
WHERE 
    id =  @id AND rol = @rol
    AND NOT EXISTS (
       
        SELECT 1 
        FROM users 
        WHERE username = @username AND id != @id
    );

SELECT CASE WHEN @@ROWCOUNT > 0 THEN 1 ELSE 0 END AS sonuc;
          
                        `)
            return result.recordset[0]

        } catch (error) {
            throw new Error(error.message)
        }
    },


     async birthdateCelebrate(data) {
        try {
            let result = await new sql.Request()
                .query(`
                        SELECT o.AdSoyad, fc.fcm_token, 'Kıymetli Öğrencimiz Doğum Gününüz Kutlu Olsun' as msj
                        FROM Ogrenciler o
                        inner join FCM_TOKEN fc on fc.user_type = 'student' and fc.[user_id] = o.OgrenciId
                        WHERE MONTH(o.DogumTarihi) = MONTH(GETDATE())
                        AND DAY(o.DogumTarihi) = DAY(GETDATE())

                        UNION ALL

                        SELECT o.AdSoyad, fc.fcm_token, 'Kıymetli Öğretmenimiz Doğum Gününüz Kutlu Olsun' as msj
                        FROM Ogretmenler o
                        inner join FCM_TOKEN fc on fc.user_type = 'teacher' and fc.[user_id] = o.OgretmenID
                        WHERE MONTH(o.DogumTarihi) = MONTH(GETDATE())
                        AND DAY(o.DogumTarihi) = DAY(GETDATE());

          
                        `)
            return result.recordset

        } catch (error) {
            throw new Error(error.message)
        }
    },


}












module.exports = userRepository




