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
    const nim = req.body.npm;
    const keterangan = req.body.keterangan;
    const latlong = req.body.latlong;
    const geolokasi = req.body.geolokasi;
    // try {
    //     const absensi = await getJadwalAbsensi(nim)
    //     if (absensi.length < 1) {
    //         res.status(500).send({
    //             status: false,
    //             message: 'Data Tidak Di Temukan..!',
    //             data: null
    //         })
    //     } else {
    //         res.send({
    //             status: true,
    //             message: 'Data Di Temukan..!',
    //             data: absensi
    //         })
    //     }
    // } catch (error) {
    //     res.status(500).send({
    //         status:false,
    //         message:'Data Tidak Di Temukan..!',
    //         data: null
    //     })
    // }
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

module.exports = koas