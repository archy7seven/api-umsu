const utility = {}
const fs = require('fs')

utility.index = (req,res)=>{
    try {
        let rawdata = fs.readFileSync('./assets/utility.json');
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

module.exports = utility