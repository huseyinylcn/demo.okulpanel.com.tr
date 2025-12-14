const sql = require("mssql")



let financeRepository = {

 async create(data){
    try {
        let result = await new sql.Request()
        .input("user_id",sql.Int,data.user_id)
        .input("tutar",sql.Int,data.tutar)
        .input("taksit_sayisi",sql.Int,data.taksit_sayisi)
        .input("baslangic_tarihi",sql.Date,data.baslangic_tarihi)

        .query(`
            
            
                INSERT INTO [dbo].[student_finans]
                    ([user_id]
                    ,[tutar]
                    ,[taksit_sayisi]
                    ,[baslangic_tarihi])
                VALUES
                    (@user_id
                    ,@tutar
                    ,@taksit_sayisi
                    ,@baslangic_tarihi
                    );

                    SELECT SCOPE_IDENTITY() AS id;
            
            `)

            return  result.recordset
        
    } catch (error) {
        throw new Error(`Patladık Baba: ${error}`)
    }
 },


 async create_detail(data) {


    try {
        
        let result = await new sql.Request()
        .input("finans_id",sql.Int,data.finans_id)
        .input("taksit",sql.Int,data.taksit)
        .input("taksit_tutar",sql.Int,data.taksit_tutar)
        .input("taksit_tarihi",sql.Date,data.taksit_tarihi)
        .input("extra",sql.NVarChar,data.extra)
        .input("durum",sql.Int,data.durum)
        .input("odeme_tipi",sql.NVarChar,data.odeme_tipi)
        .input("makbuz_no",sql.NVarChar,data.makbuz_no)


        .query(`
            
              INSERT INTO [dbo].[student_finans_detail]
           ([finans_id]
           ,[taksit]
           ,[taksit_tutar]
           ,[taksit_tarihi]
           ,[extra]
           ,[durum]
           ,[odeme_tipi]
           ,[makbuz_no]
           ,[ids]

           
           )
     VALUES
           (@finans_id
           ,@taksit
           ,@taksit_tutar
           ,@taksit_tarihi
           ,'0'
           ,@durum
           ,@odeme_tipi
           ,@makbuz_no
           ,'[]'
           
           
           )

            
            
            `)


            return true

    } catch (error) {
        throw new Error(`Patladık Baba: ${error}`)
    }
    
 },


 async studentSpacialGet_StartDate(data){
    try {
        let result = await new sql.Request()
        .input("id",sql.Int, data.id)

        .query(`
            
	            SELECT TOP(1) baslangic_tarihi FROM dbo.student_finans where [user_id] = @id
            
            `)

                

            return result.recordset




    } catch (error) {
        console.log(error)

        throw new Error("Sql Boku yedi agam")
        
    }
 },

 async studentSpacialGet(data){
    try {
        let result = await new sql.Request()
        .input("id",sql.Int, data.id)


        .query(`
            SELECT
    sf.finans_id,
    sf.OgrenciID,
    SUM(sf.ogrenci_ucret) AS taksit_tutar,
    
        CONVERT(VARCHAR(10), DATEADD(day, ${data.startDate}, DATEADD(month, DATEDIFF(month, 0, DATEADD(day, -${data.startDate}, sf.tarih)), 0)), 120) AS taksit_tarih

FROM
    dbo.spacial_lesson sf 
	where sf.OgrenciID = @id

GROUP BY

    DATEADD(month, DATEDIFF(month, 0, DATEADD(day, -14, sf.tarih)), 0),
    sf.OgrenciID,
    sf.finans_id

            
            `)

                

            return result.recordset




    } catch (error) {

        throw new Error("Sql Boku yedi agam")
        
    }
 },

 async spacialLessonAdd(data) {
    try {

        let result = await new sql.Request()
        .input("Ders",sql.NVarChar,data.Ders)
        .input("DersSaati",sql.NVarChar,data.DersSaati)
        .input("OgrenciID",sql.Int,data.OgrenciID)
        .input("OgretmenID",sql.Int,data.OgretmenID)
        .input("Gun",sql.NVarChar,data.Gun)
        .input("tarih",sql.Date,data.tarih)
        .input("ogrenci_ucret",sql.Int,data.ogrenci_ucret)
        .input("ogretmen_ucret",sql.Int,data.ogretmen_ucret)
        .input("finans_id",sql.Int,data.finans_id)


        .query(`
            INSERT INTO [dbo].[spacial_lesson]
           ([Ders]
           ,[DersSaati]
           ,[OgrenciID]
           ,[OgretmenID]
           ,[Gun]
           ,[tarih]
           ,[ogrenci_ucret]
           ,[ogretmen_ucret]
           ,[finans_id]


           
           )
     VALUES
           (@Ders
           ,@DersSaati
           ,@OgrenciID
           ,@OgretmenID
           ,@Gun
           ,@tarih
           ,@ogrenci_ucret
           ,@ogretmen_ucret
           ,@finans_id
           )


            SELECT SCOPE_IDENTITY() AS id;
            `)


            return  result.recordset
    } catch (error) {
        throw new Error (`SQL Boku Yedi AĞAM: ${error}`)
    }
 },

 async studentFinanceDetailUpdateOrInsert(data){
    try {
        let result = await new sql.Request()



        .input("finans_id",sql.Int,data.finans_id)
        .input("OgrenciID",sql.Int,data.OgrenciID)
        .input("taksit_tutar",sql.Int,data.taksit_tutar)
        .input("taksit_tarih",sql.Date,data.taksit_tarih)
        .input("ids",sql.NVarChar,data.ids)




        .query(`
        

    IF EXISTS (

    SELECT 1
    FROM student_finans_detail 
    WHERE 
        taksit_tarihi = @taksit_tarih
        AND finans_id = @finans_id
        AND durum = 0
)
BEGIN
    UPDATE student_finans_detail
    SET taksit_tutar = taksit_tutar + @taksit_tutar,
	extra = CAST( (CAST(extra AS INT) + @taksit_tutar) AS NVARCHAR(50)),
    ids = (
        SELECT CONCAT('[', STRING_AGG(value, ','), ']')
        FROM (
            SELECT value FROM OPENJSON(ids) -- Mevcut veriyi aç
            UNION -- UNION kullanırsan aynı ID'leri eler (Merge). UNION ALL hepsini ekler.
            SELECT value FROM OPENJSON(@ids) -- Yeni gelen veriyi aç
        ) AS merged_data
    )

    WHERE 
        taksit_tarihi =  @taksit_tarih
        AND finans_id = @finans_id
        AND durum = 0;

END
ELSE
BEGIN
 
INSERT INTO [dbo].[student_finans_detail]
           ([finans_id]
           ,[taksit]
           ,[taksit_tutar]
           ,[taksit_tarihi]
           ,[extra]
           ,[durum]
           ,[odeme_tipi]
           ,[makbuz_no]
           ,[ids]

           
           )
     VALUES
           ( @finans_id
           ,0
           ,@taksit_tutar
           ,@taksit_tarih
           ,'${data.taksit_tutar}'
           ,0
           ,NULL
           ,NULL
           ,@ids
           )
END
            
            `)


            return  true
        
    } catch (error) {
        console.log(error)
        throw new Error(`SQL ERROR: ${error}`)
    }
 },


  async studentFinanses(data){
    try {
        

        let result = await new sql.Request()
        .query(`
            
                        

SELECT o.Sinif, o.AdSoyad,o.OgrenciNumara,o.TCKimlikNo,o.OgrenciId,sf.id FROM dbo.student_finans sf
INNER JOIN dbo.Ogrenciler o ON o.OgrenciId = sf.[user_id]
            
            `)



            return result.recordset
    } catch (error) {
        throw new Error("Sql Boku yedi agam")
    }
 },

 async studentFinanceGet(data) {
    try {
        let result = await new sql.Request()
        .input("id",sql.Int,data.id)
        .query(`
            select sf.[user_id], sf.tutar as kayit_ucreti, sf.baslangic_tarihi, sf.id, sfd.id as taksit_id, sfd.taksit_tutar,sfd.taksit_tarihi,sfd.extra, sfd.durum,sfd.odeme_tipi,sfd.makbuz_no,sfd.ids from student_finans sf 
                inner join student_finans_detail sfd on sfd.finans_id = sf.id
                where sf.[user_id] = @id
            
            `)
            return result.recordset
        
    } catch (error) {
        throw new Error(`SQL HATASI ${error}`)
    }
 },
  async payment(data) {
    try {
        let result = await new sql.Request()
        .input("durum",sql.Int,data.durum)
        .input("odeme_tipi",sql.NVarChar,data.odeme_tipi)
        .input("makbuz_no",sql.NVarChar,data.makbuz_no)
        .input("id",sql.Int,data.id)

        .query(`
            update student_finans_detail
            set durum = @durum,
            odeme_tipi = @odeme_tipi,
            makbuz_no = @makbuz_no
            where id = @id
            `)
            return true
        
    } catch (error) {
        throw new Error(`SQL HATASI ${error}`)
    }
 },


   async spacialLessonMenthDetail(data) {
    try {
        let result = await new sql.Request()
        
        
        .input("id",sql.Int,data.id)

        .query(`

        	select sl.*, o.AdSoyad as ogretmenAd from spacial_lesson sl
	inner join Ogretmenler o on o.OgretmenID  = sl.OgretmenID
	
	where sl.id IN (${data.sorgu}) and sl.OgrenciID = @id

            `)
            return result.recordset
        
    } catch (error) {
        throw new Error(`SQL HATASI ${error}`)
    }
 },


    async spacialLessonGet(data) {
    try {
        let result = await new sql.Request()

        .input("id",sql.Int,data.id)

        .query(`
                SELECT sl.*, o.AdSoyad, og.AdSoyad as OgretmenAdSoyad from spacial_lesson sl
            inner join Ogrenciler o on o.OgrenciId = sl.OgrenciID
            left join Ogretmenler og on og.OgretmenID = sl.OgretmenID


            where sl.OgrenciID = @id

            `)
            return result.recordset
        
    } catch (error) {
        throw new Error(`SQL HATASI ${error}`)
    }
 },
     async spacialLessonDelete(data) {
    try {
        let result = await new sql.Request()

        .input("id",sql.NVarChar,data.id)

        .query(`
                                
                    BEGIN TRANSACTION; 



                    DECLARE @OgrenciTaksit INT;  


                    select  @OgrenciTaksit = ISNULL(ogrenci_ucret, 0) from spacial_lesson where id = @id



                    IF @OgrenciTaksit > 0
                    BEGIN
                        UPDATE student_finans_detail
                        SET taksit_tutar = taksit_tutar - @OgrenciTaksit,
                            extra = CAST((CAST(extra AS INT) - @OgrenciTaksit) AS NVARCHAR(50))
                        WHERE EXISTS (
                            SELECT 1 FROM OPENJSON(ids) WHERE value = @id
                        );

                        DELETE FROM student_finans_detail
                        WHERE taksit_tutar <= 0 
                        AND EXISTS (SELECT 1 FROM OPENJSON(ids) WHERE value = @id);


                        UPDATE student_finans_detail
                        SET ids = (
                            SELECT '[' + STRING_AGG([value], ',') + ']'
                            FROM OPENJSON(ids)
                            WHERE [value] != @id
                        )
                        WHERE taksit_tutar > 0 
                        AND EXISTS (SELECT 1 FROM OPENJSON(ids) WHERE value = @id);


                        delete spacial_lesson where id = @id
                    END
                    COMMIT TRANSACTION; 

            `)
            return true
        
    } catch (error) {
        throw new Error(`SQL HATASI ${error}`)
    }
 },

     async studentFinanceControl(data) {
    try {
        let result = await new sql.Request()

        .input("id",sql.Int,data.id)

        .query(`

SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM student_finans WHERE [user_id] = @id) 
        THEN 0
        ELSE 1 
    END AS sonuc;

            `)
            return result.recordset[0]

        
    } catch (error) {
        throw new Error(`SQL HATASI ${error}`)
    }
 },


}


module.exports = financeRepository


