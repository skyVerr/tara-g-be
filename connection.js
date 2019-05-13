const mysql = require('mysql');

// var pool = mysql.createPool({
//     connectionLimit : 10,
//     host            : 'sql146.main-hosting.eu.',
//     user            : 'u687158084_tarag',
//     database        : 'u687158084_tarag',
//     password        : 'ClzlG1B41La7'
// });

var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    database        : 'db_tara_g',
    password        : ''
});

module.exports = pool;