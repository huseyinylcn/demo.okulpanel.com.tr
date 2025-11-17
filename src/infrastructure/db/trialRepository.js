const sql = require("mssql")

const { pool } = require("./../../config/database");

let trialRepository = {



    async schemaGet(data) {
        try {
            let result = await new sql.Request()
                .input("id", sql.Int, data.id)
                .query(`
                SELECT *
                FROM [demo].[dbo].[trialSchema] where id = @id
                `)

            return result.recordset[0]
        } catch (error) {
            throw new Error("SQL GET HATASI!!!")
        }
    },

    async schemaGetAll(data) {
        try {
            let result = await new sql.Request()
                .query(`
                SELECT name, id
                FROM [demo].[dbo].[trialSchema]
                `)

            return result.recordset
        } catch (error) {
            throw new Error("SQL GET HATASI!!!")
        }
    },

    async schemaAdd(data) {
        try {
            let result = await new sql.Request()
                .input("name", sql.NVarChar, data.name)
                .input("schema", sql.NVarChar, data.schema)


                .query(`
               INSERT INTO [dbo].[trialSchema]
           ([name]
           ,[schema])
            VALUES
                (@name
                ,@schema 
           )
                `)

            return true
        } catch (error) {
            throw new Error("SQL GET HATASI!!!")
        }
    },

    async studentGet(data) {
        try {

            let result = await new sql.Request()
                .input("no", sql.NVarChar, data.okulno)
                .input("tc", sql.NVarChar, data.tc)


                .query(`
               select OgrenciId,AdSoyad,OgrenciNumara,Sinif from Ogrenciler where OgrenciNumara = @no or TCKimlikNo = @tc
                `)

            return result.recordset[0]
        } catch (error) {
            throw new Error("SQL GET HATASI!!!")
        }
    },

    async responseKey(data) {
        try {

            let result = await new sql.Request()
                .input("ders", sql.NVarChar, data.ders)
                .input("sorusayisi", sql.Int, data.sorusayisi)
                .input("kitapcik", sql.NVarChar, data.kitapcik)
                .input("cevap", sql.NVarChar, data.cevap)
                .input("kazanim", sql.NVarChar, data.kazanim)
                .input("name", sql.NVarChar, data.name)




                .query(`
               INSERT INTO [dbo].[trialResponseKey]
           ([ders]
           ,[sorusayisi]
           ,[kitapcik]
           ,[cevap]
           ,[kazanim]
           ,[name])
     VALUES
           (@ders
           ,@sorusayisi
           ,@kitapcik
           ,@cevap
           ,@kazanim
           ,@name
           
           )
                `)

            return true
        } catch (error) {
            throw new Error("SQL GET HATASI!!!")
        }
    },
    async responseKeyGet(data) {
        try {

            let result = await new sql.Request()




                .query(`
       select [name] from trialResponseKey  group by [name]
                `)

            return result.recordset
        } catch (error) {
            throw new Error("SQL GET HATASI!!!")
        }
    },

    async responseKeyNameQuery(data) {
        try {

            let result = await new sql.Request()
                .input("name", sql.NVarChar, data.name)

                .query(`
                    SELECT
                    CASE
                        WHEN EXISTS (SELECT 1 FROM trialResponseKey WHERE [name] = @name)
                        THEN 0 
                        ELSE 1 
                    END AS sonuc;
                `)

            return result.recordset[0]
        } catch (error) {
            throw new Error("SQL GET HATASI!!!")
        }
    },
    async trialRead(data, cvpname) {
        try {

            const poolConn = pool(); // global pool al

            if (!poolConn) throw new Error("DB Pool henüz oluşturulmadı");


            const table = new sql.Table('trial'); // table type adı
            table.columns.add('GirisId', sql.Int);
            table.columns.add('adSoyad', sql.NVarChar(100));
            table.columns.add('tc', sql.NVarChar(11));
            table.columns.add('okulno', sql.NVarChar(20));
            table.columns.add('Sinif', sql.NVarChar(10));
            table.columns.add('kitapcik', sql.NVarChar(5));
            table.columns.add('turkce', sql.NVarChar(sql.MAX));
            table.columns.add('sosyal', sql.NVarChar(sql.MAX));
            table.columns.add('din', sql.NVarChar(sql.MAX));
            table.columns.add('ingilizce', sql.NVarChar(sql.MAX));
            table.columns.add('matematik', sql.NVarChar(sql.MAX));
            table.columns.add('fen', sql.NVarChar(sql.MAX));
            table.columns.add('tel', sql.NVarChar(20));
            table.columns.add('name', sql.NVarChar(50));


            let i = 0
            for (const [index, o] of data.entries()) {
                table.rows.add(
                    index,
                    o.adSoyad,
                    o.tc,
                    o.okulno,
                    o.Sinif,
                    o.kitapcik,
                    o.turkce,
                    o.sosyal,
                    o.din,
                    o.ingilizce,
                    o.matematik,
                    o.fen,
                    o.tel,
                    cvpname
                );
            }

            const result = await poolConn.request()
                .input('OgrenciListesi', table)
                .execute('TrialTest2');

            return result.recordset;



        } catch (error) {
            console.log(error)
            throw new Error("SQL OKUMA HATASI")
        }
    },

    async trialReadAdd(data) {
        try {

            const table = new sql.Table('[dbo].[trialResponse]');
            table.create = false;
            table.columns.add('AdSoyad', sql.NVarChar(500), { nullable: true });
            table.columns.add('TCKimlikNo', sql.NVarChar(50), { nullable: true });
            table.columns.add('OgrenciNumara', sql.NVarChar(50), { nullable: true });
            table.columns.add('Sinif', sql.NVarChar(50), { nullable: true });
            table.columns.add('OgrenciId', sql.Int, { nullable: true });
            table.columns.add('kitapcik', sql.NVarChar(50), { nullable: true });
            table.columns.add('responseKeyName', sql.NVarChar(400), { nullable: true });
            table.columns.add('json', sql.NVarChar('max'), { nullable: true });
            table.columns.add('turkceDogru', sql.Int, { nullable: true });
            table.columns.add('turkceYanlis', sql.Int, { nullable: true });
            table.columns.add('turkceBos', sql.Int, { nullable: true });
            table.columns.add('sosyalDogru', sql.Int, { nullable: true });
            table.columns.add('sosyalYanlis', sql.Int, { nullable: true });
            table.columns.add('sosyalBos', sql.Int, { nullable: true });
            table.columns.add('dinDogru', sql.Int, { nullable: true });
            table.columns.add('dinYanlis', sql.Int, { nullable: true });
            table.columns.add('dinBos', sql.Int, { nullable: true });
            table.columns.add('ingilizceDogru', sql.Int, { nullable: true });
            table.columns.add('ingilizceYanlis', sql.Int, { nullable: true });
            table.columns.add('ingilizceBos', sql.Int, { nullable: true });
            table.columns.add('matematikDogru', sql.Int, { nullable: true });
            table.columns.add('matematikYanlis', sql.Int, { nullable: true });
            table.columns.add('matematikBos', sql.Int, { nullable: true });
            table.columns.add('fenDogru', sql.Int, { nullable: true });
            table.columns.add('fenYanlis', sql.Int, { nullable: true });
            table.columns.add('fenBos', sql.Int, { nullable: true });
            table.columns.add('id', sql.Int, { nullable: false });



            for (const response of data) {
                table.rows.add(
                    response.AdSoyad,
                    response.TCKimlikNo,
                    response.OgrenciNumara,
                    response.Sinif,
                    response.OgrenciId,
                    response.kitapcik,
                    response.responseKeyName,
                    response.json,
                    response.turkceDogru,
                    response.turkceYanlis,
                    response.turkceBos,
                    response.sosyalDogru,
                    response.sosyalYanlis,
                    response.sosyalBos,
                    response.dinDogru,
                    response.dinYanlis,
                    response.dinBos,
                    response.ingilizceDogru,
                    response.ingilizceYanlis,
                    response.ingilizceBos,
                    response.matematikDogru,
                    response.matematikYanlis,
                    response.matematikBos,
                    response.fenDogru,
                    response.fenYanlis,
                    response.fenBos,
                    response.id
                );
            }
            const request = new sql.Request();
            const result = await request.bulk(table);
            return true



        } catch (error) {
            console.log(error)
            throw new Error(`SQL KAyıt Hatası ${error.message}`)
        }
    },

    async trialAdd(data) {
        try {

            let result = await new sql.Request()
                .input("name", sql.NVarChar, data.name)
                .input("explanation", sql.NVarChar, data.aciklama)
                .input("yayin", sql.Int, data.yayin)
                .query(`
                    INSERT INTO [dbo].[trials]
                        ([name]
                        ,[explanation]
                        ,[yayin]
                        ,[date])
                        
                    VALUES
                        (@name
                        ,@explanation
                        ,@yayin
                        ,GETDATE()
                        );

                        SELECT SCOPE_IDENTITY() AS id;
                    `)

            return result.recordset[0].id

        } catch (error) {
            console.log(error)
            throw new Error("SQL ADD HATASI");

        }
    },
    async trialGet(data) {
        try {
            let result = await new sql.Request()

                .query(`
                    select * from trials order by [date] 
                `)

            return result.recordset
        } catch (error) {
            throw new Error("SQL GET HATASI");

        }
    },

    async trialResultGet(data) {
        try {
            let result = await new sql.Request()
                .input("id", sql.Int, data.id)

                .query(`
                       WITH sonuc as(
                    select AdSoyad,TCKimlikNo,OgrenciNumara,Sinif,OgrenciId,kitapcik,responseKeyName,turkceDogru,turkceYanlis,turkceBos,sosyalDogru,sosyalYanlis,sosyalBos,dinDogru,dinYanlis,dinBos,ingilizceDogru,ingilizceYanlis,ingilizceBos,matematikDogru,matematikYanlis,matematikBos,fenDogru,fenYanlis,fenBos,id,trial_id

						,(dbo.puanHesaplama(turkceDogru,turkceYanlis, sosyalDogru,sosyalYanlis, dinDogru,dinYanlis, ingilizceDogru, ingilizceYanlis) + dbo.puanHesaplama2(matematikDogru,matematikYanlis,fenDogru, fenYanlis) +190.8754 ) as puan
                        ,dbo.NetHesaplama(turkceDogru,turkceYanlis) as turkceNet
                        ,dbo.NetHesaplama(sosyalDogru,sosyalYanlis) as sosyalNet
                        ,dbo.NetHesaplama(dinDogru,dinYanlis) as dinNet
                        ,dbo.NetHesaplama(ingilizceDogru,ingilizceYanlis) as ingilizceNet
                        ,dbo.NetHesaplama(matematikDogru,matematikYanlis) as matematikNet
                        ,dbo.NetHesaplama(fenDogru,fenYanlis) as fenNet


                        from trialResponse 

                        where id = @id
) select *, (turkceNet+ sosyalNet + dinNet + ingilizceNet + matematikNet+ fenNet) as toplamNet from sonuc order by puan DESC
                `)

            return result.recordset
        } catch (error) {
            throw new Error("SQL GET HATASI");

        }
    },


    async trialPublic(data) {
        try {
            let result = await new sql.Request()
                .input("id", sql.Int, data.id)
                .input("yayin", sql.Int, data.yayin)


                .query(`
                update trials
                    set yayin = @yayin
                where id = @id
                `)

            return true
        } catch (error) {
            throw new Error("SQL GET HATASI");

        }
    },
    async trialDelete(data) {
        try {
            let result = await new sql.Request()
                .input("id", sql.Int, data.id)


                .query(`
                        delete from trialResponse where id = @id
                        delete from trials where id = @id
                `)

            return true
        } catch (error) {
            throw new Error("SQL GET HATASI");

        }
    },
    async studentTrialGet(data) {
        try {



            let result = await new sql.Request()
                .input("OgrenciId", sql.Int, data.OgrenciId)


                .query(`                  
	select tr.[name], trp.id, tr.[date]
	
		,(dbo.puanHesaplama( trp.turkceDogru,trp.turkceYanlis,   trp.sosyalDogru,trp.sosyalYanlis  ,   trp.dinDogru,trp.dinYanlis,   trp.ingilizceDogru,trp.ingilizceYanlis) + 190.8754) as SozelHamPuan    
		,(dbo.puanHesaplama2(trp.matematikDogru, trp.matematikYanlis, trp.fenDogru, trp.fenYanlis)) as SayisalHamPuan
		,dbo.NetHesaplama(trp.matematikDogru, trp.matematikYanlis) as MatNet
		,dbo.NetHesaplama(trp.turkceDogru, trp.turkceYanlis) as TurkceNet
		,turkceDogru
		,turkceYanlis
		,turkceBos
		,dbo.NetHesaplama(trp.sosyalDogru, trp.sosyalYanlis) as SosyalNet
		,dbo.NetHesaplama(trp.dinDogru, trp.dinYanlis) as DinNet
		,dbo.NetHesaplama(trp.ingilizceDogru, trp.ingilizceYanlis) as IngilizceNet
		,dbo.NetHesaplama(trp.fenDogru, trp.fenYanlis) as FenNet
	
	
	from trials tr

	inner join trialResponse trp on trp.id = tr.id


	where tr.yayin = 1 and trp.OgrenciId = @OgrenciId

	ORDER BY 
    trp.id DESC;

                `)

            return result.recordset
        } catch (error) {
            throw new Error("SQL GET HATASI");

        }
    },

    async studentTrialGetOne(data) {
        try {
            const sayi = String(data.id);
            let [tam, ondalik = "1"] = sayi.split(".");

            tam = Number(tam)

             ondalik = Number(ondalik - 1)

            let result = await new sql.Request()
                .input("OgrenciId", sql.Int, data.OgrenciId)
                .input("id", sql.Int, tam)



                .query(`                  
  WITH ProblematicGroups AS (
    SELECT 
        tr.OgrenciId, 
        tr.id,
        tr.kitapcik
    FROM 
        trialResponse tr
    WHERE 
        tr.id = @id AND tr.OgrenciId = @OgrenciId
    GROUP BY 
        tr.OgrenciId, tr.id, tr.kitapcik
    HAVING 
        -- KURAL 1: Grupta "karışık" (hem sözel hem sayısal) bir satır var mı?
        COUNT(CASE WHEN 
            (turkceDogru > 0 OR turkceYanlis > 0 OR sosyalDogru > 0 OR sosyalYanlis > 0 OR dinDogru > 0 OR dinYanlis > 0 OR ingilizceDogru > 0 OR ingilizceYanlis > 0)
            AND 
            (matematikDogru > 0 OR matematikYanlis > 0 OR fenDogru > 0 OR fenYanlis > 0)
        THEN 1 END) > 0
        -- KURAL 2: Grupta birden fazla "sözel-içeren" satır var mı?
        OR COUNT(CASE WHEN (turkceDogru > 0 OR turkceYanlis > 0 OR sosyalDogru > 0 OR sosyalYanlis > 0 OR dinDogru > 0 OR dinYanlis > 0 OR ingilizceDogru > 0 OR ingilizceYanlis > 0) THEN 1 END) > 1
        -- KURAL 3: Grupta birden fazla "sayısal-içeren" satır var mı?
        OR COUNT(CASE WHEN (matematikDogru > 0 OR matematikYanlis > 0 OR fenDogru > 0 OR fenYanlis > 0) THEN 1 END) > 1
),

-- 2. ADIM: "Temiz" gruplar için birleştirilmiş JSON parçalarını hazırla
-- (Bu, sadece 'temiz' (1S+1S) olanları birleştirmek için çalışır)
MergedCleanJsonParts AS (
    SELECT
        tr.OgrenciId, tr.id, tr.kitapcik,
        j.ders, j.sorusayisi, j.cevap, j.sonuc, j.kazanim,
        -- Sözel mi Sayısal mı olduğunu belirle
        CASE WHEN (tr.turkceDogru > 0 OR tr.turkceYanlis > 0) THEN 'Sozel' ELSE 'Sayisal' END AS OturumTipi
    FROM trialResponse AS tr
    CROSS APPLY OPENJSON(tr.[json]) WITH (ders NVARCHAR(50), sorusayisi INT, cevap NVARCHAR(10), sonuc INT, kazanim NVARCHAR(MAX)) AS j
    WHERE tr.id = @id AND tr.OgrenciId =  @OgrenciId
    -- Sadece "temiz" (sorunlu olmayan) grupları dahil et
    AND NOT EXISTS (
        SELECT 1 FROM ProblematicGroups p 
        WHERE tr.OgrenciId = p.OgrenciId AND tr.id = p.id AND tr.kitapcik = p.kitapcik
    )
),
-- 3. ADIM: Temiz JSON parçalarını birleştirerek FinalJson'u oluştur
CleanJsonFinal AS (
    SELECT
        OgrenciId, id, kitapcik,
        (
            SELECT 
                ders, sorusayisi, cevap, sonuc, kazanim
            FROM MergedCleanJsonParts j_inner
            WHERE j_inner.OgrenciId = j_outer.OgrenciId
              AND j_inner.id = j_outer.id
              AND j_inner.kitapcik = j_outer.kitapcik
              -- Kural: Sözel oturumdan sözel dersleri, sayısal oturumdan sayısal dersleri al
              AND (
                (j_inner.OturumTipi = 'Sozel' AND j_inner.ders IN ('turkce', 'sosyal', 'din', 'ingilizce'))
                OR
                (j_inner.OturumTipi = 'Sayisal' AND j_inner.ders IN ('matematik', 'fen'))
              )
            ORDER BY 
                CASE j_inner.ders 
                    WHEN 'turkce' THEN 1 WHEN 'sosyal' THEN 2 WHEN 'din' THEN 3
                    WHEN 'ingilizce' THEN 4 WHEN 'matematik' THEN 5 WHEN 'fen' THEN 6 ELSE 7
                END, sorusayisi
            FOR JSON PATH
        ) AS FinalJson
    FROM MergedCleanJsonParts j_outer
    GROUP BY OgrenciId, id, kitapcik
),

-- 4. ADIM: "Sorunlu" ve "Temiz" sonuçları birleştir
FinalResults AS (
    -- PARÇA A: "Sorunlu" kayıtlar (Gruplanmayanlar)
    -- (Eğer 2 "karışık" satır varsa, 2 satır da buraya gelir)
    SELECT
        tr.trial_id, tr.id, tr.kitapcik,
        tr.turkceDogru, tr.turkceYanlis, tr.turkceBos,
        tr.sosyalDogru, tr.sosyalYanlis, tr.sosyalBos,
        tr.dinDogru, tr.dinYanlis, tr.dinBos,
        tr.ingilizceDogru, tr.ingilizceYanlis, tr.ingilizceBos,
        tr.matematikDogru, tr.matematikYanlis, tr.matematikBos,
        tr.fenDogru, tr.fenYanlis, tr.fenBos,
        tr.[json] AS FinalJson -- Orijinal JSON'u al, birleştirme
    FROM 
        trialResponse tr
    WHERE 
        tr.id = @id AND tr.OgrenciId =  @OgrenciId AND
        EXISTS (
            SELECT 1 FROM ProblematicGroups p 
            WHERE tr.OgrenciId = p.OgrenciId AND tr.id = p.id AND tr.kitapcik = p.kitapcik
        )

    UNION ALL

    -- PARÇA B: "Temiz" kayıtlar (Gruplananlar)
    -- (Eğer 1 Sözel + 1 Sayısal varsa, 1 satır olarak buraya gelir)
    SELECT
        MIN(tr.trial_id) AS trial_id, tr.id, tr.kitapcik,
        MAX(tr.turkceDogru) AS turkceDogru, MAX(tr.turkceYanlis) AS turkceYanlis, MIN(tr.turkceBos) AS turkceBos,
        MAX(tr.sosyalDogru) AS sosyalDogru, MAX(tr.sosyalYanlis) AS sosyalYanlis, MIN(tr.sosyalBos) AS sosyalBos,
        MAX(tr.dinDogru) AS dinDogru, MAX(tr.dinYanlis) AS dinYanlis, MIN(tr.dinBos) AS dinBos,
        MAX(tr.ingilizceDogru) AS ingilizceDogru, MAX(tr.ingilizceYanlis) AS ingilizceYanlis, MIN(tr.ingilizceBos) AS ingilizceBos,
        MAX(tr.matematikDogru) AS matematikDogru, MAX(tr.matematikYanlis) AS matematikYanlis, MIN(tr.matematikBos) AS matematikBos,
        MAX(tr.fenDogru) AS fenDogru, MAX(tr.fenYanlis) AS fenYanlis, MIN(tr.fenBos) AS fenBos,
        cj.FinalJson -- 3. Adımda hazırlanan BİRLEŞTİRİLMİŞ JSON'u al
    FROM 
        trialResponse tr
    LEFT JOIN 
        CleanJsonFinal cj ON tr.OgrenciId = cj.OgrenciId AND tr.id = cj.id AND tr.kitapcik = cj.kitapcik
    WHERE 
        tr.id = @id AND tr.OgrenciId =  @OgrenciId AND
        NOT EXISTS (
            SELECT 1 FROM ProblematicGroups p 
            WHERE tr.OgrenciId = p.OgrenciId AND tr.id = p.id AND tr.kitapcik = p.kitapcik
        )
    GROUP BY 
        tr.id, tr.kitapcik, cj.FinalJson
)
-- FİNAL ADIM: Sütunları istediğin gibi seç
SELECT
    -- UI için 34.1, 34.2 formatlaması
    CASE
        WHEN COUNT(1) OVER (PARTITION BY fr.id) > 1 
        THEN CAST(fr.id AS VARCHAR(20)) + '.' + 
             CAST(ROW_NUMBER() OVER (
                PARTITION BY fr.id 
                ORDER BY fr.trial_id 
             ) AS VARCHAR(5))
        ELSE CAST(fr.id AS VARCHAR(20))
    END AS id, 
    
    fr.turkceDogru,
    fr.turkceYanlis,
    fr.turkceBos,
    dbo.NetHesaplama(fr.turkceDogru, fr.turkceYanlis) as turkceNet,

    fr.sosyalDogru,
    fr.sosyalYanlis,
    fr.sosyalBos,
    dbo.NetHesaplama(fr.sosyalDogru, fr.sosyalYanlis) as sosyalNet,

    fr.dinDogru,
    fr.dinYanlis,
    fr.dinBos,
    dbo.NetHesaplama(fr.dinDogru, fr.dinYanlis) as dinNet,

    fr.ingilizceDogru,
    fr.ingilizceYanlis,
    fr.ingilizceBos,
    dbo.NetHesaplama(fr.ingilizceDogru, fr.ingilizceYanlis) as ingilizceNet,

    fr.matematikDogru,
    fr.matematikYanlis,
    fr.matematikBos,
    dbo.NetHesaplama(fr.matematikDogru, fr.matematikYanlis) as matematikNet,

    fr.fenDogru,
    fr.fenYanlis,
    fr.fenBos,
    dbo.NetHesaplama(fr.fenDogru, fr.fenYanlis) as fenNet,
    
    fr.FinalJson
FROM
    FinalResults fr;
                `)

            return result.recordset[ondalik]
        } catch (error) {
            throw new Error("SQL GET HATASI");

        }
    },

   async statisticsClass (data) {
        try {
            

            let result = await new sql.Request()
                .input("id", sql.Int, data.id)



                .query(`                  
select 
Sinif
,  CAST(  ROUND(   avg(  CAST( turkceDogru AS DECIMAL(10,2))), 2) as DECIMAL(10,2))as turkceDogru
,  CAST(  ROUND(   avg(  CAST( turkceYanlis AS DECIMAL(10,2))) , 2) as DECIMAL(10,2))as turkceYanlis
, CAST(  ROUND(  avg( dbo.NetHesaplama(turkceDogru,turkceYanlis) ), 2) as DECIMAL(10,2)) as turkceNet

,  CAST(  ROUND(   avg(  CAST( sosyalDogru AS DECIMAL(10,2))) , 2) as DECIMAL(10,2))as sosyalDogru
,  CAST(  ROUND(   avg(  CAST( sosyalYanlis AS DECIMAL(10,2))) , 2) as DECIMAL(10,2))as sosyalYanlis
,CAST(  ROUND(avg(dbo.NetHesaplama(sosyalDogru,sosyalYanlis)), 2) AS DECIMAL(10,2) )as sosyalNet


,  CAST(  ROUND(   avg(  CAST( dinDogru AS DECIMAL(10,2))) , 2) as DECIMAL(10,2))as dinDogru
,  CAST(  ROUND(   avg(  CAST( dinYanlis AS DECIMAL(10,2))) , 2) as DECIMAL(10,2))as dinYanlis
, CAST(  ROUND( avg(dbo.NetHesaplama(dinDogru,dinYanlis)), 2) AS DECIMAL(10,2) ) as dinNet

,  CAST(  ROUND(   avg(  CAST( ingilizceDogru AS DECIMAL(10,2))) , 2) as DECIMAL(10,2))as ingilizceDogru
,  CAST(  ROUND(   avg(  CAST( ingilizceYanlis AS DECIMAL(10,2))) , 2) as DECIMAL(10,2))as ingilizceYanlis
, CAST(  ROUND(avg(dbo.NetHesaplama(ingilizceDogru,ingilizceYanlis)), 2) AS DECIMAL(10,2) ) as ingilizceNet

,  CAST(  ROUND(   avg(  CAST( matematikDogru AS DECIMAL(10,2))) , 2) as DECIMAL(10,2))as matematikDogru
,  CAST(  ROUND(   avg(  CAST( matematikYanlis AS DECIMAL(10,2))) , 2) as DECIMAL(10,2))as matematikYanlis
,CAST(  ROUND(avg(dbo.NetHesaplama(matematikDogru,matematikYanlis)), 2) AS DECIMAL(10,2) ) as matematikNet

,  CAST(  ROUND(   avg(  CAST( fenDogru AS DECIMAL(10,2))) , 2) as DECIMAL(10,2))as fenDogru
,  CAST(  ROUND(   avg(  CAST( fenYanlis AS DECIMAL(10,2))) , 2) as DECIMAL(10,2))as fenYanlis
,CAST(  ROUND(avg(dbo.NetHesaplama(fenDogru,fenYanlis)), 2) AS DECIMAL(10,2) ) as fenNet

,CAST(ROUND(
    AVG(
        CAST(
            turkceDogru +
            sosyalDogru +
            dinDogru +
            ingilizceDogru +
            matematikDogru +
            fenDogru
        AS DECIMAL(10,2))
    ), 2
) as decimal(10,2))AS toplamDogru




,CAST(ROUND(
    AVG(
        CAST(
            turkceYanlis +
            sosyalYanlis +
            dinYanlis +
            ingilizceYanlis +
            matematikYanlis +
            fenYanlis
        AS DECIMAL(10,2))
    ), 2
) as decimal(10,2))AS toplamYanlis


,CAST( ROUND(avg(( dbo.NetHesaplama(turkceDogru,turkceYanlis) + dbo.NetHesaplama(sosyalDogru,sosyalYanlis) + dbo.NetHesaplama(dinDogru,dinYanlis) + dbo.NetHesaplama(ingilizceDogru,ingilizceYanlis) + dbo.NetHesaplama(matematikDogru,matematikYanlis) + dbo.NetHesaplama(fenDogru,fenYanlis)  )), 2) AS DECIMAL(10,2)) as toplamNet


    , CAST( ROUND( 
        AVG(
            -- Koşullu puan hesaplaması için CASE kullanıyoruz
            CASE 
               
                WHEN (turkceDogru + turkceBos + turkceYanlis) > 15 THEN 

				                    (dbo.puanHesaplama(turkceDogru,turkceYanlis, sosyalDogru,sosyalYanlis, dinDogru,dinYanlis,ingilizceDogru,ingilizceYanlis) + dbo.puanHesaplama2(matematikDogru,matematikYanlis,fenDogru,fenYanlis) + 190.8754)




                ELSE 
					100 + (
						( 
							(dbo.NetHesaplama(matematikDogru,matematikYanlis) * 4) 
							+(dbo.NetHesaplama(fenDogru,fenYanlis) * 4) 
							+(dbo.NetHesaplama(ingilizceDogru,ingilizceYanlis) * 1)
							+(dbo.NetHesaplama(dinDogru,dinYanlis) * 1)
							+(dbo.NetHesaplama(sosyalDogru,sosyalYanlis) * 1)
							+(dbo.NetHesaplama(turkceDogru,turkceYanlis) * 4)
						) / 210 
					) * 400 
            
            END 
        )
      , 4) AS DECIMAL(10,4)) as puan 


from trialResponse where id = @id


group by Sinif

order by toplamNet DESC;


                    
                `)

            return result.recordsets
        } catch (error) {
            throw new Error("SQL GET HATASI");

        }
    },

       async statisticsClassWeb (data) {
        try {
            

            let result = await new sql.Request()
                .input("id", sql.Int, data.id)



                .query(`                  
                    SELECT *
                    FROM (
                        -- 1. SINIF ORTALAMALARI (Mevcut Sorgunuz)
                        SELECT 
                            Sinif,
                            CAST(ROUND(AVG(CAST(turkceDogru AS DECIMAL(10,2))), 2) AS DECIMAL(10,2)) AS turkceDogru,
                            CAST(ROUND(AVG(CAST(turkceYanlis AS DECIMAL(10,2))), 2) AS DECIMAL(10,2)) AS turkceYanlis,
                            CAST(ROUND(AVG(dbo.NetHesaplama(turkceDogru,turkceYanlis)), 2) AS DECIMAL(10,2)) AS turkceNet,
                            CAST(ROUND(AVG(CAST(sosyalDogru AS DECIMAL(10,2))), 2) AS DECIMAL(10,2)) AS sosyalDogru,
                            CAST(ROUND(AVG(CAST(sosyalYanlis AS DECIMAL(10,2))), 2) AS DECIMAL(10,2)) AS sosyalYanlis,
                            CAST(ROUND(AVG(dbo.NetHesaplama(sosyalDogru,sosyalYanlis)), 2) AS DECIMAL(10,2)) AS sosyalNet,
                            CAST(ROUND(AVG(CAST(dinDogru AS DECIMAL(10,2))), 2) AS DECIMAL(10,2)) AS dinDogru,
                            CAST(ROUND(AVG(CAST(dinYanlis AS DECIMAL(10,2))), 2) AS DECIMAL(10,2)) AS dinYanlis,
                            CAST(ROUND(AVG(dbo.NetHesaplama(dinDogru,dinYanlis)), 2) AS DECIMAL(10,2)) AS dinNet,
                            CAST(ROUND(AVG(CAST(ingilizceDogru AS DECIMAL(10,2))), 2) AS DECIMAL(10,2)) AS ingilizceDogru,
                            CAST(ROUND(AVG(CAST(ingilizceYanlis AS DECIMAL(10,2))), 2) AS DECIMAL(10,2)) AS ingilizceYanlis,
                            CAST(ROUND(AVG(dbo.NetHesaplama(ingilizceDogru,ingilizceYanlis)), 2) AS DECIMAL(10,2)) AS ingilizceNet,
                            CAST(ROUND(AVG(CAST(matematikDogru AS DECIMAL(10,2))), 2) AS DECIMAL(10,2)) AS matematikDogru,
                            CAST(ROUND(AVG(CAST(matematikYanlis AS DECIMAL(10,2))), 2) AS DECIMAL(10,2)) AS matematikYanlis,
                            CAST(ROUND(AVG(dbo.NetHesaplama(matematikDogru,matematikYanlis)), 2) AS DECIMAL(10,2)) AS matematikNet,
                            CAST(ROUND(AVG(CAST(fenDogru AS DECIMAL(10,2))), 2) AS DECIMAL(10,2)) AS fenDogru,
                            CAST(ROUND(AVG(CAST(fenYanlis AS DECIMAL(10,2))), 2) AS DECIMAL(10,2)) AS fenYanlis,
                            CAST(ROUND(AVG(dbo.NetHesaplama(fenDogru,fenYanlis)), 2) AS DECIMAL(10,2)) AS fenNet,
                            
                            -- TOPLAM DOĞRU/YANLIŞ/NET
                            CAST(ROUND(AVG(CAST(turkceDogru + sosyalDogru + dinDogru + ingilizceDogru + matematikDogru + fenDogru AS DECIMAL(10,2))), 2) AS DECIMAL(10,2)) AS toplamDogru,
                            CAST(ROUND(AVG(CAST(turkceYanlis + sosyalYanlis + dinYanlis + ingilizceYanlis + matematikYanlis + fenYanlis AS DECIMAL(10,2))), 2) AS DECIMAL(10,2)) AS toplamYanlis,
                            CAST(ROUND(AVG((dbo.NetHesaplama(turkceDogru,turkceYanlis) + dbo.NetHesaplama(sosyalDogru,sosyalYanlis) + dbo.NetHesaplama(dinDogru,dinYanlis) + dbo.NetHesaplama(ingilizceDogru,ingilizceYanlis) + dbo.NetHesaplama(matematikDogru,matematikYanlis) + dbo.NetHesaplama(fenDogru,fenYanlis))), 2) AS DECIMAL(10,2)) AS toplamNet,
                            
                            -- PUAN HESAPLAMASI (Mevcut Sorgunuzdaki Koşullu Mantık Korundu)
                            CAST(ROUND(AVG(
                                CASE 
                                    WHEN (turkceDogru + turkceBos + turkceYanlis) > 15 THEN 
                                        (dbo.puanHesaplama(turkceDogru,turkceYanlis, sosyalDogru,sosyalYanlis, dinDogru,dinYanlis,ingilizceDogru,ingilizceYanlis) + dbo.puanHesaplama2(matematikDogru,matematikYanlis,fenDogru,fenYanlis) + 190.8754)
                                    ELSE 
                                        100 + (((dbo.NetHesaplama(matematikDogru,matematikYanlis) * 4) + (dbo.NetHesaplama(fenDogru,fenYanlis) * 4) + (dbo.NetHesaplama(ingilizceDogru,ingilizceYanlis) * 1) + (dbo.NetHesaplama(dinDogru,dinYanlis) * 1) + (dbo.NetHesaplama(sosyalDogru,sosyalYanlis) * 1) + (dbo.NetHesaplama(turkceDogru,turkceYanlis) * 4)) / 210) * 400 
                                END 
                            ), 4) AS DECIMAL(10,4)) AS puan
                        FROM trialResponse
                        WHERE id = @id
                        GROUP BY Sinif

                        UNION ALL

                        -- 2. GENEL ORTALAMA SATIRI (GROUP BY yok, sadece AVG kullanılır)
                        SELECT 
                            'GENEL' AS Sinif,
                            CAST(ROUND(AVG(CAST(turkceDogru AS DECIMAL(10,2))), 2) AS DECIMAL(10,2)),
                            CAST(ROUND(AVG(CAST(turkceYanlis AS DECIMAL(10,2))), 2) AS DECIMAL(10,2)),
                            CAST(ROUND(AVG(dbo.NetHesaplama(turkceDogru,turkceYanlis)), 2) AS DECIMAL(10,2)),
                            CAST(ROUND(AVG(CAST(sosyalDogru AS DECIMAL(10,2))), 2) AS DECIMAL(10,2)),
                            CAST(ROUND(AVG(CAST(sosyalYanlis AS DECIMAL(10,2))), 2) AS DECIMAL(10,2)),
                            CAST(ROUND(AVG(dbo.NetHesaplama(sosyalDogru,sosyalYanlis)), 2) AS DECIMAL(10,2)),
                            CAST(ROUND(AVG(CAST(dinDogru AS DECIMAL(10,2))), 2) AS DECIMAL(10,2)),
                            CAST(ROUND(AVG(CAST(dinYanlis AS DECIMAL(10,2))), 2) AS DECIMAL(10,2)),
                            CAST(ROUND(AVG(dbo.NetHesaplama(dinDogru,dinYanlis)), 2) AS DECIMAL(10,2)),
                            CAST(ROUND(AVG(CAST(ingilizceDogru AS DECIMAL(10,2))), 2) AS DECIMAL(10,2)),
                            CAST(ROUND(AVG(CAST(ingilizceYanlis AS DECIMAL(10,2))), 2) AS DECIMAL(10,2)),
                            CAST(ROUND(AVG(dbo.NetHesaplama(ingilizceDogru,ingilizceYanlis)), 2) AS DECIMAL(10,2)),
                            CAST(ROUND(AVG(CAST(matematikDogru AS DECIMAL(10,2))), 2) AS DECIMAL(10,2)),
                            CAST(ROUND(AVG(CAST(matematikYanlis AS DECIMAL(10,2))), 2) AS DECIMAL(10,2)),
                            CAST(ROUND(AVG(dbo.NetHesaplama(matematikDogru,matematikYanlis)), 2) AS DECIMAL(10,2)),
                            CAST(ROUND(AVG(CAST(fenDogru AS DECIMAL(10,2))), 2) AS DECIMAL(10,2)),
                            CAST(ROUND(AVG(CAST(fenYanlis AS DECIMAL(10,2))), 2) AS DECIMAL(10,2)),
                            CAST(ROUND(AVG(dbo.NetHesaplama(fenDogru,fenYanlis)), 2) AS DECIMAL(10,2)),

                            -- TOPLAM DOĞRU/YANLIŞ/NET
                            CAST(ROUND(AVG(CAST(turkceDogru + sosyalDogru + dinDogru + ingilizceDogru + matematikDogru + fenDogru AS DECIMAL(10,2))), 2) AS DECIMAL(10,2)),
                            CAST(ROUND(AVG(CAST(turkceYanlis + sosyalYanlis + dinYanlis + ingilizceYanlis + matematikYanlis + fenYanlis AS DECIMAL(10,2))), 2) AS DECIMAL(10,2)),
                            CAST(ROUND(AVG((dbo.NetHesaplama(turkceDogru,turkceYanlis) + dbo.NetHesaplama(sosyalDogru,sosyalYanlis) + dbo.NetHesaplama(dinDogru,dinYanlis) + dbo.NetHesaplama(ingilizceDogru,ingilizceYanlis) + dbo.NetHesaplama(matematikDogru,matematikYanlis) + dbo.NetHesaplama(fenDogru,fenYanlis))), 2) AS DECIMAL(10,2)),

                            -- PUAN HESAPLAMASI (Koşullu Mantık Korundu)
                            CAST(ROUND(AVG(
                                CASE 
                                    WHEN (turkceDogru + turkceBos + turkceYanlis) > 15 THEN 
                                        (dbo.puanHesaplama(turkceDogru,turkceYanlis, sosyalDogru,sosyalYanlis, dinDogru,dinYanlis,ingilizceDogru,ingilizceYanlis) + dbo.puanHesaplama2(matematikDogru,matematikYanlis,fenDogru,fenYanlis) + 190.8754)
                                    ELSE 
                                        100 + (((dbo.NetHesaplama(matematikDogru,matematikYanlis) * 4) + (dbo.NetHesaplama(fenDogru,fenYanlis) * 4) + (dbo.NetHesaplama(ingilizceDogru,ingilizceYanlis) * 1) + (dbo.NetHesaplama(dinDogru,dinYanlis) * 1) + (dbo.NetHesaplama(sosyalDogru,sosyalYanlis) * 1) + (dbo.NetHesaplama(turkceDogru,turkceYanlis) * 4)) / 210) * 400 
                                END 
                            ), 4) AS DECIMAL(10,4))
                        FROM trialResponse
                        WHERE id = @id
                    ) AS Sonuc
                    ORDER BY 
                        CASE WHEN Sinif = 'GENEL' THEN 1 ELSE 0 END,
                        toplamNet DESC;
                    
                `)

            return result.recordsets
        } catch (error) {
            throw new Error("SQL GET HATASI");

        }
    },

    async statisticsSelectTrial(data) {
        try {


            let result = await new sql.Request()
               

                .query(`
select 
OgrenciNumara,AdSoyad, Sinif 

, CAST(  ROUND( AVG(  dbo.NetHesaplama(turkceDogru,turkceYanlis)) , 2) as DECIMAL(10,2)) as turkceNet


, CAST(  ROUND( AVG(  dbo.NetHesaplama(sosyalDogru,sosyalYanlis)) , 2) as DECIMAL(10,2)) as sosyalNet

, CAST(  ROUND( AVG(  dbo.NetHesaplama(dinDogru,dinYanlis)), 2) as DECIMAL(10,2)) as dinNet

, CAST(  ROUND( AVG(  dbo.NetHesaplama(ingilizceDogru,ingilizceYanlis)), 2) as DECIMAL(10,2)) as ingilizceNet

, CAST(  ROUND( AVG(  dbo.NetHesaplama(matematikDogru,matematikYanlis)), 2) as DECIMAL(10,2)) as matematikNet

, CAST(  ROUND( AVG(  dbo.NetHesaplama(fenDogru,fenYanlis)), 2) as DECIMAL(10,2)) as fenNet

,CAST( ROUND( AVG( ( dbo.NetHesaplama(turkceDogru,turkceYanlis) + dbo.NetHesaplama(sosyalDogru,sosyalYanlis) + dbo.NetHesaplama(dinDogru,dinYanlis) + dbo.NetHesaplama(ingilizceDogru,ingilizceYanlis) + dbo.NetHesaplama(matematikDogru,matematikYanlis) + dbo.NetHesaplama(fenDogru,fenYanlis)  )  ), 2) AS DECIMAL(10,2)) as toplamNet


    , CAST( ROUND( 
        AVG(
            -- Koşullu puan hesaplaması için CASE kullanıyoruz
            CASE 
               
                WHEN (turkceDogru + turkceBos + turkceYanlis) = 15 THEN 

100 + (
                    ( 
                        (dbo.NetHesaplama(matematikDogru,matematikYanlis) * 4) 
                        +(dbo.NetHesaplama(fenDogru,fenYanlis) * 4) 
                        +(dbo.NetHesaplama(ingilizceDogru,ingilizceYanlis) * 1)
                        +(dbo.NetHesaplama(dinDogru,dinYanlis) * 1)
                        +(dbo.NetHesaplama(sosyalDogru,sosyalYanlis) * 1)
                        +(dbo.NetHesaplama(turkceDogru,turkceYanlis) * 4)
                    ) / 210 
                ) * 400 

                ELSE 
                    (dbo.puanHesaplama(turkceDogru,turkceYanlis, sosyalDogru,sosyalYanlis, dinDogru,dinYanlis,ingilizceDogru,ingilizceYanlis) + dbo.puanHesaplama2(matematikDogru,matematikYanlis,fenDogru,fenYanlis) + 190.8754)
            
            END 
        )
      , 4) AS DECIMAL(10,4)) as puan 


from trialResponse 


where id IN (${data.id} )

group by OgrenciNumara, AdSoyad, Sinif

order by puan desc
                `)

            return result.recordset
        } catch (error) {
            throw new Error("SQL GET HATASI");

        }
    },















    async statisticsGain(data) {
        try {


            let result = await new sql.Request()
            .input("id",sql.Int,data.id)
               

                .query(`
                    select OgrenciNumara,Sinif,[json], trial_id from trialResponse  where id = @id order by Sinif
                `)

            return result.recordset
        } catch (error) {
            throw new Error("SQL GET HATASI");

        }
    },




}



module.exports = trialRepository