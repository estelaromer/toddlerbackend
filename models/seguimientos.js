//Representa las acciones contra la tabla familiares
let db = require('../db');

exports.create = ({ fecha, tipo, subtipo, estado, comentarios, alumnos, remitente }, done) => {
    let inserta = ''
    for (let i = 0; i < alumnos.length; i++) {
        inserta += `INSERT INTO seguimientos (fecha, tipo, subtipo, estado, comentarios, alumno, remitente) VALUES ('${fecha}', '${tipo}', '${subtipo}', '${estado}', '${comentarios}', ${alumnos[i]}, ${remitente});`
    }
    db.get().query(inserta, (err, result) => {
        if (err) return done(err, null);
        done(null, result);
    })
}

exports.getReceivedByEducadorId = (id, done) => {
    let consulta = `SELECT seg.*, cla.nombre, cla.id_clase, al.nombre, al.apellidos FROM toddler.seguimientos seg, toddler.alumnos al, toddler.clases cla, toddler.educadoresclases edcla, toddler.educadores ed WHERE seg.alumno = al.id_alumno AND al.clase = cla.id_clase AND cla.id_clase = edcla.clase AND edcla.educador = ed.id_educador AND ed.id_educador = ${id} AND seg.subtipo = 'familiares'`
    db.get().query(consulta, (err, result) => {
        if (err) return done(err, null);
        done(null, result);
    })
}

exports.getSentByEducadorId = (id, done) => {
    let consulta = `SELECT seg.*, al.nombre as nombreAlumno, al.apellidos, al.clase, cla.nombre as nombreClase FROM toddler.seguimientos seg, toddler.alumnos al, toddler.clases cla WHERE remitente = ${id} AND seg.alumno = al.id_alumno AND al.clase = cla.id_clase`
    db.get().query(consulta, (err, result) => {
        if (err) return done(err, null);
        done(null, result);
    })
}

exports.getSentByFamiliarId = (id, done) => {
    let consulta = `SELECT seg.*, al.nombre FROM toddler.seguimientos seg, toddler.alumnos al WHERE seg.remitente = ${id} AND seg.alumno = al.id_alumno`
    db.get().query(consulta, (err, result) => {
        if (err) return done(err, null);
        done(null, result);
    })
}

exports.getReceivedByFamiliarId = (id, done) => {
    let consulta = `SELECT seg.*, al.nombre FROM toddler.seguimientos seg, toddler.alumnos al, toddler.familiaresalumnos famal, toddler.familiares fam WHERE fam.id_familiar = ${id} AND famal.familiar = fam.id_familiar AND famal.alumno = al.id_alumno AND al.id_alumno = seg.alumno AND seg.remitente != ${id}`
    db.get().query(consulta, (err, result) => {
        if (err) return done(err, null);
        done(null, result);
    })
}

