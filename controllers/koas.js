const koas = {}
const fs = require('fs')
const connection = require('../koneksisimakad')
const connectionkoas = require('../koneksikoas')
const Request = require('tedious').Request;

koas.menu = (req,res)=>{
    try {
        let rawdata = fs.readFileSync('./assets/KoasMenu.json');
        let menus = JSON.parse(rawdata);
        res.send({
            status:true,
            message:'Data Di Temukan..!',
            data: menus.items
        })
    } catch (error) {
        res.status(500).send({
            status:false,
            message:'Data Tidak Di Temukan..!',
            data: null
        })
    }
}

koas.pengumuman = async (req,res)=>{
    try {
        const pengumuman = await dataPengumuman(res)
        if (pengumuman.length < 1) {
            res.status(500).send({
                status: false,
                message: 'Data Tidak Di Temukan..!',
                data: null
            })
        } else {
            res.send({
                status: true,
                message: 'Data Di Temukan..!',
                data: pengumuman
            })
        }
    } catch (error) {
        res.status(500).send({
            status:false,
            message:'Data Tidak Di Temukan..!',
            data: null
        })
    }
}

koas.login = async (req, res) => {
    const nim = req.body.npm;
    const pass = req.body.password;
    try {
        const account = await getMhsKoas(nim, pass)
        if (account.length < 1) {
            res.status(500).send({
                status: false,
                message: 'Data Tidak Di Temukan..!',
                data: null
            })
        } else {
            res.send({
                status: true,
                message: 'Data Di Temukan..!',
                data: account
            })
        }
    } catch (error) {
        res.status(500).send({
            status:false,
            message:'Data Tidak Di Temukan..!',
            data: null
        })
    }
}

koas.jadwal = async (req, res) => {
    const nim = req.body.npm;

    try {
        const jadwal = await getJadwalMahasiswa(nim)
        if (jadwal.length < 1) {
            res.status(500).send({
                status: false,
                message: 'Data Tidak Di Temukan..!',
                data: null
            })
        } else {
            res.send({
                status: true,
                message: 'Data Di Temukan..!',
                data: jadwal
            })
        }
    } catch (error) {
        res.status(500).send({
            status:false,
            message:'Data Tidak Di Temukan..!',
            data: null
        })
    }
}

koas.mahasiswa = async (req, res) => {
    try {
        const mahasiswa = await getDataMahasiswaKoas()
        if (mahasiswa.length < 1) {
            res.status(500).send({
                status: false,
                message: 'Data Tidak Di Temukan..!',
                data: null
            })
        } else {
            res.send({
                status: true,
                message: 'Data Di Temukan..!',
                data: mahasiswa
            })
        }
    } catch (error) {
        res.status(500).send({
            status:false,
            message:'Data Tidak Di Temukan..!',
            data: null
        })
    }
}

function dataPengumuman(req, res) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM pengumuman WHERE pengumumanIsForceToShow = 1 OR pengumumanTanggalMulai <= NOW() AND pengumumanTanggalAkhir >= NOW()", function (error, rows, fields) {
            if (error) return reject(error);
            return resolve(rows);
        })
    })
}

function getMhsKoas(nim,pass) {
    return new Promise((resolve, reject) => {
        const request = new Request("EXEC Login_Koas @Nim = '"+nim+"', @Pass = '"+pass+"'", (err, rowCount) => {
            if (err) {
                throw err;
            }
        });
        var results = [];
        let data = new Object();
        request.on('row', function(columns) {
            for (let i = 0; i < columns.length; i++) {
                data[columns[i].metadata.colName] = columns[i].value
            }
            results.push(data);
        });
    
        request.on('doneProc', function () {
            return resolve(results);
        })
        
        connection.execSql(request);
    })
}

function getJadwalMahasiswa(nim) {
    return new Promise((resolve, reject) => {
        const query = `SELECT
        jadwal.jadwalId,
        jadwal_detail.jadwalDetailTanggalMulai AS jadwalTanggalMulai,
        SUBSTRING( UNIX_TIMESTAMP( DATE_ADD( FROM_UNIXTIME( jadwal_detail.jadwalDetailTanggalSelesai / 1000 ), INTERVAL 1 DAY ))* 1000, 1, 13 ) AS jadwalTanggalSelesai,
        jadwal.jadwalJamMasuk,
        jadwal.jadwalJamKeluar,
        stase.staseNama,
        rumkit.rumahSakitWarna,
        rumkit.rumahSakitNama 
    FROM
        jadwal
        LEFT JOIN jadwal_detail ON jadwal_detail.jadwalDetailJadwalId = jadwal.jadwalId
        LEFT JOIN rumkit_detail ON rumkit_detail.rumkitDetId = jadwal.jadwalRumkitDetId
        LEFT JOIN kelompok ON kelompok.kelompokId = jadwal.jadwalKelompokId
        LEFT JOIN kelompok_detail ON kelompok_detail.kelompokDetKelompokId = kelompok.kelompokId
        LEFT JOIN stase ON stase.staseId = rumkit_detail.rumkitDetStaseId
        LEFT JOIN rumkit ON rumkit.rumahSakitId = rumkit_detail.rumkitDetRumkitId
        WHERE
        kelompok_detail.kelompokDetNim = '${nim}' 
        AND jadwal_detail.jadwalDetailTanggalMulai <= UNIX_TIMESTAMP( NOW()) * 1000 AND jadwal_detail.jadwalDetailTanggalSelesai >= UNIX_TIMESTAMP(
        NOW()) * 1000 
        AND stase.staseId NOT IN (
        SELECT
            skipJadwalDetailId
        FROM
            jadwal_skip 
        WHERE
            skipNpm = '${nim}'  
            AND jadwal_skip.skipTanggalAwal/1000 <= UNIX_TIMESTAMP( NOW())  AND jadwal_skip.skipTanggalAkhir/1000 >= UNIX_TIMESTAMP(
            NOW()) 
        OR 
        skipNpm = '${nim}'
            AND ISNULL( skipTanggalAktifKembali ))
    GROUP BY
        jadwal.jadwalId`;
        connectionkoas.query(query, function (error, rows, fields) {
            if (error) return reject(error);
            return resolve(rows);
        })
    })
    
}
function getDataMahasiswaKoas() {
    return new Promise((resolve, reject) => {
        const query = `EXEC Get_Mhs_Koas`;
        const request = new Request(query, (err, rowCount) => {
            if (err) {
                throw err;
            }
        });
        var results = [];
        let data = new Object();
        request.on('row', function(columns) {
            for (let i = 0; i < columns.length; i++) {
                data[columns[i].metadata.colName] = columns[i].value
            }
            results.push(data);
        });
    
        request.on('doneProc', function () {
            return resolve(results);
        })
        
        connection.execSql(request);
    })
    
}

module.exports = koas