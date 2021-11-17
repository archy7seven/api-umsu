
const connection = require('./koneksi')

function query(query){
    return new Promise((resolve, reject) => {
        connection.query(query, function (err, rows) {
            if(err) return reject(err);
            return resolve(rows);
        })
    })
}

module.exports = {query}