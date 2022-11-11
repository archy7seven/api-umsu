const connection = require('../koneksisimakad')
const connectionkoas = require('../koneksikoas')
const Request = require('tedious').Request;

function dataPengumuman() {
    return new Promise((resolve, reject) => {
        connectionkoas.query("SELECT * FROM pengumuman WHERE pengumumanIsForceToShow = 1 OR pengumumanTanggalMulai <= NOW() AND pengumumanTanggalAkhir >= NOW()", function (error, rows, fields) {
            if (error) return reject(error);
            return resolve(rows);
        })
    })
}

function getMhsKoas(nim, pass) {
    return new Promise((resolve, reject) => {
        const request = new Request(`EXEC Login_Koas @Nim = '${nim}', @Pass = '${pass}'`, (err, rowCount) => {
            if (err) {
                throw err;
            }
        });
        var results = [];
        let data = new Object();
        request.on('row', function (columns) {
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
        request.on('row', function (columns) {
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

function getTahunAkademik() {
    return new Promise((resolve, reject) => {
        const query = `SELECT Term_Year_Name FROM Mstr_Term_Year WHERE Start_Date <= GETDATE() AND End_Date >= GETDATE()`;
        const request = new Request(query, (err, rowCount) => {
            if (err) {
                throw err;
            }
        });
        var results = [];
        let data = new Object();
        request.on('row', function (columns) {
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

function getJadwalAbsensi(nim) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * 
        FROM
            jadwal
            LEFT JOIN rumkit_detail ON rumkit_detail.rumkitDetId = jadwal.jadwalRumkitDetId
            LEFT JOIN rumkit ON rumkit.rumahSakitId = rumkit_detail.rumkitDetRumkitId
            LEFT JOIN kelompok ON kelompok.kelompokId = jadwal.jadwalKelompokId
            LEFT JOIN kelompok_detail ON kelompok_detail.kelompokDetKelompokId = kelompok.kelompokId
            LEFT JOIN stase ON stase.staseId = rumkit_detail.rumkitDetStaseId
            LEFT JOIN jadwal_detail ON jadwal_detail.jadwalDetailJadwalId = jadwal.jadwalId 
            WHERE
            jadwal_detail.jadwalDetailNpm = '${nim}' 
            and kelompok_detail.kelompokDetNim = '${nim}'
            AND date(
            FROM_UNIXTIME( jadwal_detail.jadwalDetailTanggalMulai / 1000 )) <= date( NOW()) AND date( FROM_UNIXTIME( jadwal_detail.jadwalDetailTanggalSelesai / 1000 )) >= date(
            NOW())
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
                AND ISNULL( skipTanggalAktifKembali ))`
        connectionkoas.query(query, function (error, rows, fields) {
            if (error) return reject(error);
            return resolve(rows);
        })
    })
}

function getInitKegiatan(nim) {
    return new Promise((resolve, reject) => {
        const query = `SELECT
        * 
    FROM
        jadwal
        LEFT JOIN rumkit_detail ON rumkit_detail.rumkitDetId = jadwal.jadwalRumkitDetId
        LEFT JOIN kelompok ON kelompok.kelompokId = jadwal.jadwalKelompokId
        LEFT JOIN kelompok_detail ON kelompok_detail.kelompokDetKelompokId = kelompok.kelompokId
        LEFT JOIN stase ON stase.staseId = rumkit_detail.rumkitDetStaseId
        LEFT JOIN rumkit ON rumkit.rumahSakitId = rumkit_detail.rumkitDetRumkitId 
        LEFT JOIN jadwal_detail ON jadwal_detail.jadwalDetailJadwalId = jadwal.jadwalId 
    WHERE
        kelompok_detail.kelompokDetNim = '${nim}' and
        jadwal_detail.jadwalDetailNpm ='${nim}' AND date(
        FROM_UNIXTIME( jadwal_detail.jadwalDetailTanggalMulai / 1000 )) <= date( NOW()) AND date( FROM_UNIXTIME( jadwal_detail.jadwalDetailTanggalSelesai / 1000 )) >= date(
        NOW())`
        connectionkoas.query(query, function (error, rows, fields) {
            if (error) return reject(error);
            return resolve(rows);
        })
    })
}

function cekJadwalSkip(nim) {
    return new Promise((resolve, reject) => {
        const query = `CALL Cek_Skip_Exists ('${nim}')`
        connectionkoas.query(query, function (error, rows, fields) {
            if (error) return reject(error);
            return resolve(rows);
        })
    })
}

function getAbsensiExist(nim, keterangan) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM absensi WHERE absensiNim = '${nim}' AND date(FROM_UNIXTIME( absensi.absensiTanggal / 1000 )) = date(NOW()) AND absensiKeterangan = '${keterangan}'`
        connectionkoas.query(query, function (error, rows, fields) {
            if (error) return reject(error);
            return resolve(rows);
        })
    })
}

function simpanAbsensi(npm, keterangan, latlong, geolokasi, tahunAkademik) {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO absensi (absensiNim, absensiTanggal, absensiKeterangan, absensiLatLong, absensiLokasi, absensiTahunAkademik) VALUES ('${npm}', '${Date.now()}', '${keterangan}', '${latlong}', '${geolokasi}', '${tahunAkademik}')`
        connectionkoas.query(query, function (error, result) {
            if (error) return reject(error);
            return resolve(result);
        })
    })
}

function getDoping(rs) {
    return new Promise((resolve, reject) => {
        const query = `select * from dosen_pembimbing
        left join rumkit on rumkit.rumahSakitId = dosen_pembimbing.dopingRumkitId
        left join rumkit_detail on rumkit_detail.rumkitDetRumkitId = rumkit.rumahSakitId
        where rumkit_detail.rumkitDetId = ${rs}`
        connectionkoas.query(query, function (error, rows, fields) {
            if (error) return reject(error);
            return resolve(rows);
        })
    })
}

module.exports = {
    dataPengumuman,
    getTahunAkademik,
    getMhsKoas,
    getJadwalMahasiswa,
    getDataMahasiswaKoas,
    getJadwalAbsensi,
    getInitKegiatan,
    cekJadwalSkip,
    getAbsensiExist,
    simpanAbsensi,
    getDoping
};