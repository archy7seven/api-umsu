const jadwal = {}
const fs = require('fs')
const connection = require('../koneksi')

jadwal.index = (req,res)=>{
    try {
        connection.query("SELECT * FROM r_periode LEFT JOIN r_tahun_aktif on r_tahun_aktif.tahunNama = r_periode.prdrTahun WHERE prdrJenisUjian = 'NonKedokteran' AND tahunAktif = 1 AND prdrStatusAktif = 1",function (error,rows,fields) {
            if (error) {
                res.status(500).send({
                    status:false,
                    message:'Data Tidak Di Temukan..!',
                    data: null
                })
            } else {
                res.send({
                    status:true,
                    message:'Data Di Temukan..!',
                    // dataJadwalCBT: dataJadwalCBT(res),
                    // lengthJadwalCBT:null,
                    // dataJadwalPBT:null,
                    // lengthJadwalPBT:null,
                    // dataJadwalFK:null,
                    // lengthJadwalFK:null,
                    // dataJadwalPasca:null,
                    // lengthJadwalPasca:null
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

function getNames(){
    // get names from the database or API
    let firstName = 'John',
        lastName = 'Doe'

    // return as an array
    return [firstName, lastName]
}

function dataJadwalCBT(req,res){
    connection.query("SELECT * FROM r_periode LEFT JOIN r_tahun_aktif on r_tahun_aktif.tahunNama = r_periode.prdrTahun WHERE prdrJenisUjian = 'Kedokteran' AND tahunAktif = 1 AND prdrJalurUjian = 'pbt' AND prdrGelombang in (1,2,3)",function (error,rows,fields) {
        if (error) return console.error(error)
        res.send(rows) 
    })
}


module.exports = jadwal