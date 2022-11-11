const koas = {}
const fs = require('fs')
const mkoas = require('../models/m_koas')

koas.menu = (req, res) => {
    try {
        let rawdata = fs.readFileSync('./assets/KoasMenu.json');
        let menus = JSON.parse(rawdata);
        res.send({
            status: true,
            message: 'Data Di Temukan..!',
            data: menus.items
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            message: 'Data Tidak Di Temukan..!',
            data: null
        })
    }
}

koas.pengumuman = async (req, res) => {
    try {
        const pengumuman = await mkoas.dataPengumuman()
        console.log(pengumuman);
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
            status: false,
            message: 'Data Tidak Di Temukan..!',
            data: null
        })
    }
}

koas.login = async (req, res) => {
    const nim = req.body.npm;
    const pass = req.body.password;
    try {
        const account = await mkoas.getMhsKoas(nim, pass)
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
            status: false,
            message: 'Data Tidak Di Temukan..!',
            data: null
        })
    }
}

koas.jadwal = async (req, res) => {
    const nim = req.body.npm;

    try {
        const jadwal = await mkoas.getJadwalMahasiswa(nim)
        // console.log(jadwal);
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
            status: false,
            message: 'Data Tidak Di Temukan..!',
            data: null
        })
    }
}

koas.mahasiswa = async (req, res) => {
    try {
        const mahasiswa = await mkoas.getDataMahasiswaKoas()
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
            status: false,
            message: 'Data Tidak Di Temukan..!',
            data: null
        })
    }
}

koas.tahunAkademik = async (req, res) => {
    try {
        const tahunAkademik = await mkoas.getTahunAkademik()
        if (tahunAkademik.length < 1) {
            res.status(500).send({
                status: false,
                message: 'Data Tidak Di Temukan..!',
                data: null
            })
        } else {
            res.send({
                status: true,
                message: 'Data Di Temukan..!',
                data: tahunAkademik
            })
        }
    } catch (error) {
        res.status(500).send({
            status: false,
            message: 'Data Tidak Di Temukan..!',
            data: null
        })
    }
}

koas.jadwalabsen = async (req, res) => {
    const nim = req.body.npm;
    try {
        const jadwalabsen = await mkoas.getJadwalAbsensi(nim)
        if (jadwalabsen.length < 1) {
            res.status(500).send({
                status: false,
                message: 'Data Tidak Di Temukan..!',
                data: null
            })
        } else {
            res.send({
                status: true,
                message: 'Data Di Temukan..!',
                data: jadwalabsen
            })
        }
    } catch (error) {
        res.status(500).send({
            status: false,
            message: 'Data Tidak Di Temukan..!',
            data: null
        })
    }
}

koas.absensi = async (req, res) => {
    const npm = req.body.npm;
    const keterangan = req.body.keterangan;
    const latlong = req.body.latlong;
    const geolokasi = req.body.geolokasi;
    const cekSkipExist = await mkoas.cekJadwalSkip(npm);
    const tahunAkademik = await getTahunAkademik();

    try {
        if (cekSkipExist[0].length < 1) {
            const cekAbsensiExist = await mkoas.getAbsensiExist(npm, keterangan);
            if (cekAbsensiExist.length > 0) {
                res.status(200).send({
                    status: false,
                    message: 'Absensi Sudah Ada..!',
                })
            } else {
                const insertAbsensiMhs = mkoas.simpanAbsensi(npm, keterangan, latlong, geolokasi, tahunAkademik);
                if (insertAbsensiMhs) {
                    res.status(200).send({
                        status: false,
                        message: 'Absensi Berhasil Disimpan..!',
                    })
                } else {
                    res.status(200).send({
                        status: false,
                        message: 'Absensi Sudah Ada..!',
                    })
                }
            }
        } else {
            res.status(200).send({
                status: false,
                message: 'Maaf, Jadwal Kamu Sedang Ditangguhkan !!',
                data: null
            })
        }
    } catch (error) {
        res.status(500).send({
            status: false,
            message: 'Terjadi kesalahan',
        })
    }
}

koas.initkegiatan = async (req, res) => {
    const nim = req.body.npm;
    try {
        const initkegiatan = await mkoas.getInitKegiatan(nim)
        if (initkegiatan.length < 1) {
            res.status(500).send({
                status: false,
                message: 'Data Tidak Di Temukan..!',
                data: null
            })
        } else {
            res.send({
                status: true,
                message: 'Data Di Temukan..!',
                data: initkegiatan
            })
        }
    } catch (error) {
        res.status(500).send({
            status: false,
            message: 'Data Tidak Di Temukan..!',
            data: null
        })
    }
}

async function getTahunAkademik() {
    const tahunAkademikKoas = await mkoas.getTahunAkademik()
    return (tahunAkademikKoas.length > 0) ? tahunAkademikKoas[0].Term_Year_Name : null;
}

koas.getDoping = async (req, res) => {
    const rs = req.body.rumahSakitId;
    try {
        const cekDosenPembimbing = await mkoas.getDoping(rs)
        if (cekDosenPembimbing.length < 1) {
            res.status(500).send({
                status: false,
                message: 'Data Tidak Di Temukan..!',
                data: null
            })
        } else {
            res.send({
                status: true,
                message: 'Data Di Temukan..!',
                data: cekDosenPembimbing
            })
        }
    } catch (error) {
        res.status(500).send({
            status: false,
            message: 'Data Tidak Di Temukan..!',
            data: null
        })
    }
}

module.exports = koas