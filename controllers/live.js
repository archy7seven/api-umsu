const live = {}
const fs = require('fs')

live.index = (req, res) => {
    try {
        let rawdata = fs.readFileSync('./assets/Live.json')
        let menus = JSON.parse(rawdata)
        res.send({
            status: true,
            message: 'Data Live Di Temukan..!',
            data: menus.items
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            message: 'Data Live Tidak Di Temukan..!',
            data: null
        })
    }
}

module.exports = live