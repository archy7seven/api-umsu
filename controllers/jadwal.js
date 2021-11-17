const jadwal = {}
const helper = require('../helpers')


var queryCBT = "SELECT * FROM r_periode LEFT JOIN r_tahun_aktif on r_tahun_aktif.tahunNama = r_periode.prdrTahun WHERE prdrJenisUjian = 'NonKedokteran' AND tahunAktif = 1 AND prdrJalurUjian = 'cbt' AND prdrStatusAktif = 1"
var queryPBT = "SELECT * FROM r_periode LEFT JOIN r_tahun_aktif on r_tahun_aktif.tahunNama = r_periode.prdrTahun WHERE prdrJenisUjian = 'NonKedokteran' AND tahunAktif = 1 AND prdrJalurUjian = 'cbto' AND prdrGelombang in (1,2,3)"
var queryFK = "SELECT * FROM r_periode LEFT JOIN r_tahun_aktif on r_tahun_aktif.tahunNama = r_periode.prdrTahun WHERE prdrJenisUjian = 'Kedokteran' AND tahunAktif = 1 AND prdrJalurUjian = 'pbt' AND prdrGelombang in (1,2,3)"
var queryPasca = "SELECT * FROM r_periode LEFT JOIN r_tahun_aktif on r_tahun_aktif.tahunNama = r_periode.prdrTahun WHERE prdrJenisUjian = 'Pascasarjana' AND tahunAktif = 1 AND prdrJalurUjian = 'pbt' AND prdrStatusAktif = 1"

jadwal.index = async (req,res)=>{
    try {
        const jadwalResult = await helper.query("SELECT * FROM r_periode LEFT JOIN r_tahun_aktif on r_tahun_aktif.tahunNama = r_periode.prdrTahun WHERE prdrJenisUjian = 'NonKedokteran' AND tahunAktif = 1 AND prdrStatusAktif = 1")
        if(jadwalResult.error) {
            return res.status(500).send({
                status:false,
                message:'Data Tidak Di Temukan..!',
                data: null
            })
        }
        
        return res.send({
            status:true,
            message:'Data Di Temukan..!',
            dataJadwalCBT:await dataJadwal(queryCBT,false),
            lengthJadwalCBT: await dataJadwal(queryCBT,true),
            dataJadwalPBT: await dataJadwal(queryPBT,false),
            lengthJadwalPBT: await dataJadwal(queryPBT,true),
            dataJadwalFK: await dataJadwal(queryFK,false),
            lengthJadwalFK: await dataJadwal(queryFK,true),
            dataJadwalPasca: await dataJadwal(queryPasca,false),
            lengthJadwalPasca: await dataJadwal(queryPasca,true),
        })
    } catch (error) {
        res.status(500).send({
            status:false,
            message:'Error Try, Data Tidak Di Temukan..!',
            data: null
        })
    }
}

async function dataJadwal(sql,count) {
    const result = await helper.query(sql);
    if (count) return result.length
    return result
}

// function query(query) {
//     return new Promise((resolve, reject) => {
//         connection.query(query, function (err, rows) {
//             if(err) return reject(err);
//             return resolve(rows);
//         })
//     })
// }


module.exports = jadwal