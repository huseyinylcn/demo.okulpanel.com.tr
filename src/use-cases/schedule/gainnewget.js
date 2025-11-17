async function gainnewget(data,{scheduleRepository}) {
    let result = await scheduleRepository.gainnewget(data)

    const dataa = result.map(row=>({
    baslik: row.baslik,
    altbaslik: row.altbaslik ? JSON.parse(row.altbaslik) : [], 
    Sinif: row.Sinif,
    Ders: row.Ders,
    id:row.id
  }))

    return dataa
}



module.exports = gainnewget