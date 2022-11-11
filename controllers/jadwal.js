const jadwal = {}
const fs = require('fs')
const connection = require('../koneksipenmaru')

jadwal.index = async(req,res) => {
    try {
        connection.query("SELECT * FROM r_periode LEFT JOIN r_tahun_aktif on r_tahun_aktif.tahunNama = r_periode.prdrTahun WHERE prdrJenisUjian = 'NonKedokteran' AND tahunAktif = 1 AND prdrStatusAktif = 1",
            async function (error, rows, fields) {
                if (error) {
                    res.status(500).send({
                        status: false,
                        message: 'Data Tidak Di Temukan..!',
                        data: null
                    })
                } else {
                    const jadwalCBT = await dataJadwalCBT(res);
                    const jadwalPBT = await dataJadwalPBT(res);
                    const jadwalFK = await dataJadwalFK(res);
                    const jadwalPasca = await dataJadwalPasca(res);
                    res.send({
                        status: true,
                        message: 'Data Di Temukan..!',
                        dataJadwalCBT: jadwalCBT,
                        lengthJadwalCBT: jadwalCBT.length,
                        dataJadwalPBT: jadwalPBT,
                        lengthJadwalPBT: jadwalPBT.length,
                        dataJadwalFK: jadwalFK,
                        lengthJadwalFK: jadwalFK.length,
                        dataJadwalPasca:jadwalPasca,
                        lengthJadwalPasca:jadwalPasca.length
                    })
                }
        })
    } catch (error) {
        res.status(500).send({
            status:false,
            message:'Data Tidak Di Temukan..!',
            data: null
        })
    }
}

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


module.exports = jadwal