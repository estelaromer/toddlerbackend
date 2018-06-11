//Representa las acciones contra la tabla familiares
let db = require('../db');

exports.findAlumnosByFamiliarId = (pId, done) => {
    let consulta = 'SELECT a.nombre as nombre, a.apellidos, a.foto, c.nombre as clase, ce.nombre as centro FROM familiaresalumnos fa, alumnos a, clases c, centros ce WHERE fa.alumno = a.id_alumno AND a.clase = c.id_clase AND c.centro = ce.id_centro AND fa.familiar = ?'

    db.get().query(consulta, [pId], (err,rows) => {
        if(err) return done(err, null);
        done(null, rows);
    })
}