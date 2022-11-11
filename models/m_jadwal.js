const connection = require('../koneksipenmaru')

function dataJadwalCBT(req, res) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM r_periode LEFT JOIN r_tahun_aktif on r_tahun_aktif.tahunNama = r_periode.prdrTahun WHERE prdrJenisUjian = 'NonKedokteran' AND tahunAktif = 1 AND prdrJalurUjian = 'cbt' AND prdrStatusAktif = 1", function (error, rows, fields) {
            if (error) return reject(error);
            return resolve(rows);
        })
    })
}

function dataJadwalPBT(req, res) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM r_periode LEFT JOIN r_tahun_aktif on r_tahun_aktif.tahunNama = r_periode.prdrTahun WHERE prdrJenisUjian = 'NonKedokteran' AND tahunAktif = 1 AND prdrJalurUjian = 'cbto' AND prdrGelombang in (1,2,3)", function (error, rows, fields) {
            if (error) return reject(error);
            return resolve(rows);
        })
    })
}

function dataJadwalFK(req, res) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM r_periode LEFT JOIN r_tahun_aktif on r_tahun_aktif.tahunNama = r_periode.prdrTahun WHERE prdrJenisUjian = 'Kedokteran' AND tahunAktif = 1 AND prdrJalurUjian = 'pbt' AND prdrGelombang in (1,2,3)", function (error, rows, fields) {
            if (error) return reject(error);
            return resolve(rows);
        })
    })
}

function dataJadwalPasca(req, res) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM r_periode LEFT JOIN r_tahun_aktif on r_tahun_aktif.tahunNama = r_periode.prdrTahun WHERE prdrJenisUjian = 'Pascasarjana' AND tahunAktif = 1 AND prdrJalurUjian = 'pbt' AND prdrStatusAktif = 1", function (error, rows, fields) {
            if (error) return reject(error);
            return resolve(rows);
        })
    })
}

module.exports = {dataJadwalCBT, dataJadwalPBT,dataJadwalFK,dataJadwalPasca}