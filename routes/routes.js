var express = require('express')
var route = express()

const home = require('../controllers/home')

//home
route.get('/menu', home.menu)
route.get('/calendar',home.calendar)
route.get('/event',home.event)
route.get('/sosmed',home.sosmed)
route.get('/menuPanduanElearning',home.menuPanduanElearning)
route.get('/menuPanduanSimakad',home.menuPanduanSimakad)
route.get('/banner',home.banner)
route.get('/slider',home.slider)

module.exports = route