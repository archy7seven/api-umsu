var mysql = require('mysql')


const conn = mysql.createConnection({
    host:'222.124.3.203',
    port:'8306',
    user:'azmi',
    password:'bP7tENxZCupMIf2C',
    database:'dbPenmaru2017'
})

conn.connect((err)=>{
    if (err) throw err
    console.log('Mysql terkoneksi')
})

module.exports = conn