var mysql = require('mysql')

const conn = mysql.createConnection({
    host:'222.124.3.203',
    port:'8306',
    user:'api_penmaru',
    password:'Vc8XAoejrXFy83BD',
    database:'dbPenmaru2017'
})

conn.connect((err)=>{
    if (err) throw err
    console.log('Terkoneksi Mysql Penmaru')
})

module.exports = conn