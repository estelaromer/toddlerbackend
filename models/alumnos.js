//Representa las acciones contra la tabla familiares
let db = require('../db');

exports.findById = (pId, done) => {
    let consulta = 'SELECT * FROM alumnos WHERE id_alumno=?'
    db.get().query(consulta, [pId], (err,rows) => {
        if(err) return done(err, null);
        done(null, rows);
    })
}