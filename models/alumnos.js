//Representa las acciones contra la tabla familiares
let db = require('../db');

exports.getAlumnosByFamiliarId = (pId, done) => {
    let consulta = 'SELECT al.nombre, al.apellidos, al.clase, al.fecha_nacimiento, al.hora_entrada, al.hora_salida FROM toddler.alumnos al, toddler.familiares fa, toddler.familiaresalumnos famal WHERE fa.id_familiar= ? AND famal.familiar = fa.id_familiar AND al.id_alumno = famal.alumno'

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