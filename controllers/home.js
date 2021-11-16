const menu = {}
const { use, response } = require('../routes/routes')
const fs = require('fs')
// const respon = require('../res')
const connection = require('../koneksi')

menu.menu = (req,res)=>{
    try {
        let rawdata = fs.readFileSync('./assets/MenuUtama.json');
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

menu.calendar = (req,res)=>{
    try {
        let rawdata = fs.readFileSync('./assets/KalenderMerah.json');
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

menu.event = (req,res)=>{
    try {
        let rawdata = fs.readFileSync('./assets/KalenderAkademik.json');
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

menu.sosmed = (req,res)=>{
    try {
        let rawdata = fs.readFileSync('./assets/Sosmed.json');
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

menu.menuPanduanElearning = (req,res)=>{
    try {
        let rawdata = fs.readFileSync('./assets/MenuPanduanElearning.json');
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

menu.menuPanduanSimakad = (req,res)=>{
    try {
        let rawdata = fs.readFileSync('./assets/MenuPanduanSimakad.json');
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

menu.banner = (req,res)=>{
    try {
        connection.query('SELECT * FROM d_banner WHERE banner_active = 1 AND banner_status = 0 ORDER BY RAND() LIMIT 1',function (error,rows,fields) {
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
                    data: rows
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

menu.slider = (req,res)=>{
    try {
        connection.query('CALL penmaru_slider',function (error,rows,fields) {
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
                    data: rows
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

menu.stepLogin = (req,res)=>{
    try {
        let rawdata = fs.readFileSync('./assets/Step.json');
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

module.exports = menu