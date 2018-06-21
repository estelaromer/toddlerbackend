//Representa las acciones contra la tabla familiares
let db = require('../db');

exports.findAlumnosByFamiliarId = (pId, done) => {
    let consulta = 'SELECT a.nombre as nombre, a.apellidos, a.foto, c.nombre as clase, ce.nombre as centro FROM familiaresalumnos fa, alumnos a, clases c, centros ce WHERE fa.alumno = a.id_alumno AND a.clase = c.id_clase AND c.centro = ce.id_centro AND fa.familiar = ?'

    db.get().query(consulta, [pId], (err,rows) => {
        if(err) return done(err, null);
        done(null, rows);
    })
}

exports.findByCodigo = (pCodigo, done) => {
    let consulta = 'SELECT * from alumnos WHERE codigo_alumno = ?'

    db.get().query(consulta, [pCodigo], (err, rows) => {
        if(err) return done (err, null)
        done(null, rows)
    })
}

exports.create = ({clase, foto, nombre, apellidos, fecha_nacimiento, hora_entrada, hora_salida}, done) => {
    let values = [clase, foto, nombre, apellidos, fecha_nacimiento, hora_entrada, hora_salida];
    let inserta = 'INSERT INTO alumnos (clase, foto, nombre, apellidos, fecha_nacimiento, hora_entrada, hora_salida) VALUES (?,?,?,?,?,?,?)';
    db.get().query(inserta, values, (err, result) => {
        if(err) return done(err,null);
        done(null, result);
    });
}

exports.linkarFamiliar = ({alumno, familiar}, done) => {
    let values = [alumno, familiar];
    let inserta = 'INSERT INTO familiaresalumnos (alumno, familiar) VALUES (?,?)'
    db.get().query(inserta, values, (err, result) => {
        if(err) return done(err,null);
        done(null, result)
    })

}