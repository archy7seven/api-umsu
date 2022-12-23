var express = require('express')
var route = express()

const home = require('../controllers/home')
const alurdaftar = require('../controllers/alurdaftar')
const biaya = require('../controllers/biaya')
const kontak = require('../controllers/kontak')
const utility = require('../controllers/utility')
const jadwal = require('../controllers/jadwal')
const infoapps =require('../controllers/infoapps')
const koas = require('../controllers/koas')
const menulayanan = require('../controllers/menulayanan')

// home
route.get('/menu', home.menu)
route.get('/calendar',home.calendar)
route.get('/event',home.event)
route.get('/sosmed',home.sosmed)
route.get('/menuPanduanElearning',home.menuPanduanElearning)
route.get('/menuPanduanSimakad',home.menuPanduanSimakad)
route.get('/banner',home.banner)
route.get('/slider',home.slider)
route.get('/steplogin',home.stepLogin)
route.get('/fakultas', home.fakultas)
route.get('/menuFlutter', home.menuFlutter)

// alurdaftar
route.get('/alurdaftar', alurdaftar.index)

// biaya
route.get('/biaya', biaya.index)

// kontak
route.get('/kontak', kontak.index)

// utility
route.get('/utility', utility.index)

jadwal
route.get('/jadwal', jadwal.index)

// infoapps
route.get('/infoapps', infoapps.index)

// menulayanan
route.get('/menulayanan', menulayanan.index)

// koas
route.get('/koas/menu',koas.menu)
route.get('/koas/pengumuman',koas.pengumuman)
route.post('/koas/login',koas.login)
route.post('/koas/jadwal',koas.jadwal)
route.get('/koas/mahasiswa',koas.mahasiswa)
route.get('/koas/tahunAkademik',koas.tahunAkademik)
route.post('/koas/jadwalabsen',koas.jadwalabsen)
route.post('/koas/absensi',koas.absensi)
route.post('/koas/initkegiatan',koas.initkegiatan)
route.post('/koas/getDoping',koas.getDoping)




module.exports = route