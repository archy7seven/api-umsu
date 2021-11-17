const home = {}
const fs = require('fs')
const connection = require('../koneksi')

home.menu = (req,res)=>{
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

home.calendar = (req,res)=>{
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

home.event = (req,res)=>{
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

home.sosmed = (req,res)=>{
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

home.menuPanduanElearning = (req,res)=>{
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

home.menuPanduanSimakad = (req,res)=>{
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

home.banner = async (req,res)=>{
    try {
        await connection.query('SELECT * FROM d_banner WHERE banner_active = 1 AND banner_status = 0 ORDER BY RAND() LIMIT 1',function (error,rows,fields) {
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

home.slider = async (req,res)=>{
    try {
        await connection.query('CALL penmaru_slider',function (error,rows,fields) {
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

home.stepLogin = (req,res)=>{
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

home.fakultas = (req,res)=>{
    try {
        let rawdata = fs.readFileSync('./assets/Fakultas.json');
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

module.exports = home