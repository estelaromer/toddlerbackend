/*En este fichero tenemos nuestra conexión a la base de datos y lo importamos
donde los necesitemos.*/

var mysql = require('mysql');
var pool = null;
exports.connect = function(done) {
    pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        port: 8889,
        database: 'toddler'
    })
    done();
}

exports.get = function () {
    return pool;
}