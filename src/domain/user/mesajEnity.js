
class MesajEnity {
    constructor({ mesaj, gonderenTipi, gonderenID, aliciTipi, AliciID }) {
        if (!mesaj || !gonderenTipi  || !aliciTipi || !AliciID ) throw new Error("Eksik Veri")

        this.mesaj = mesaj
        this.gonderenTipi = gonderenTipi
        this.gonderenID = gonderenID
        this.aliciTipi = aliciTipi
        this.AliciID = AliciID

    }
}


module.exports = MesajEnity












