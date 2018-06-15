//Representa las acciones contra la tabla familiares
let db = require('../db');

exports.findClasesByEducadorId = (pId, done) => {
    let consulta = 'SELECT c.nombre as clase, ce.nombre as centro FROM educadoresclases ec, clases c, centros ce WHERE ec.clase = c.id_clase AND c.centro = ce.id_centro AND ec.educador = ?'

    db.get().query(consulta, [pId], (err,rows) => {
        if(err) return done(err, null);
        done(null, rows);
    })
}

exports.findClaseByCodigoAlumno = (pCodigo, done) => {
    let consulta = 'SELECT id_clase FROM clases WHERE codigo_alumno = ?'

    db.get().query(consulta, [pCodigo], (err, rows) => {
        if(err) return done(err,null);
        done(null, rows);
    })
}