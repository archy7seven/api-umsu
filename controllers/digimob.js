const digimob = {}
const fs = require('fs')

digimob.index = (req, res) => {
    res.status(500).send({
        status: false,
        message: 'Data Record Surat Tidak Ditemukan..!',
        data: null
    })
}

module.exports = digimob