//Representa las acciones contra la tabla familiares
let db = require('../db');

exports.create = ({ asunto, mensaje, fecha, remitente }, done) => {
    let values = [asunto, mensaje, fecha, remitente]
    let inserta = 'INSERT INTO circulares (asunto, mensaje, fecha, remitente) VALUES (?,?,?,?)'
    db.get().query(inserta, values, (err, result) => {
        console.log(values);
        if(err) return done(err,null);
        done(null, result);
    })
}

exports.linkarClases = ({circular, clases}, done) => {
    let consulta = ''
    for(let i=0; i<clases.length; i++){
        consulta += `INSERT INTO circularesclases (circular, clase) VALUES (${circular}, ${clases[i]});`
    }
    console.log(consulta)

    db.get().query(consulta , (err, result) => {
        if(err) return done(err,null);
        done(null, result);
    })
}

exports.getCircularesByIdEducador = (pId, done) => {
    let consulta = 'SELECT id_circular, asunto, mensaje, nombre, fecha FROM circulares c, circularesclases cc, clases cl WHERE c.remitente = ? AND cc.clase=cl.id_clase AND cc.circular = c.id_circular'
    db.get().query(consulta, [pId], (err, result) => {
        if(err) return done(err,null);
        done(null, result);
    })
}

exports.getCircularesByIdFamiliar = (pId, done) => {
    let consulta = 'SELECT cir.asunto, cir.mensaje, cir.fecha FROM toddler.circulares cir, toddler.circularesclases circla, toddler.clases cla, toddler.alumnos al, toddler.familiaresalumnos famal, toddler.familiares fam WHERE fam.id_familiar=? AND famal.familiar= fam.id_familiar AND famal.alumno = al.id_alumno AND al.clase = cla.id_clase AND cla.id_clase = circla.clase AND circla.circular = cir.id_circular;'
    db.get().query(consulta, [pId], (err, result) => {
        if(err) return done(err,null);
        done(null, result);
    })
}

exports.getAllCirculares = (done) => {
    let consulta = 'SELECT * from circulares'
    db.get().query(consulta, (err, result) => {
        if(err) return done(err, null);
        done(null, result);
    })
}