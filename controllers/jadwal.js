const jadwal = {}
const fs = require('fs')
const connection = require('../koneksipenmaru')
const jdwl = require('../models/m_jadwal')

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
                    const jadwalCBT = await jdwl.dataJadwalCBT(res);
                    const jadwalPBT = await jdwl.dataJadwalPBT(res);
                    const jadwalFK = await jdwl.dataJadwalFK(res);
                    const jadwalPasca = await jdwl.dataJadwalPasca(res);
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



module.exports = jadwal