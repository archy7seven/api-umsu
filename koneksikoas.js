var mysql = require('mysql')

const connkoas = mysql.createConnection({
    host:'36.66.42.253',
    port:'8306',
    user:'web_appkoas',
    password:'Z5vplk0v@C@./2fS',
    database:'web_koas'
})

connkoas.connect((err)=>{
    if (err) throw err
    console.log('Terkoneksi Mysql Koas')
})

module.exports = connkoas