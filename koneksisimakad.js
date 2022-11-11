var Connection = require('tedious').Connection

var config = {
    server: "222.124.3.204",
    options: {
        encrypt: false,
        trustServerCertificate: true,
        database: 'UMSU',
    },
    authentication: {
        type: "default",
        options: {  
            userName: "Apps",
            password: "utc#APP#2016",
        }
    }
};

var conn = new Connection(config);

// Attempt to connect and execute queries if connection goes through
conn.on('connect', function(err) {
    if (err) {
        console.log(err)
    }
    console.log('Terkoneksi Mssql Simakad')
    
});

conn.connect();

module.exports = conn