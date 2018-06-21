//Representa las acciones contra la tabla familiares
let db = require('../db');


exports.findByCodigo = (pCodigo, done) => {
    let consulta = 'SELECT * from centros WHERE codigo_centro = ?'

    db.get().query(consulta, [pCodigo], (err, rows) => {
        if(err) return done (err, null)
        done(null, rows)
    })
}