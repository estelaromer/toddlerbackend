//Representa las acciones contra la tabla educadores

let db = require('../db');

//Busca en la tabla educadores si existe un usuario con el email proporcionado en el form de login.
exports.findByCodigo = (pCodigo, done) => {
    let consulta = 'SELECT * FROM educadores WHERE codigo_educador=?';
    db.get().query(consulta, [pCodigo], (err, rows) => {
        if(err) return done(err, null);
        done(null, rows);
    })
}

//Busca en la tabla educadores si existe un usuario con el email proporcionado en el form de login.
exports.findByEmail = (pemail, done) => {
    let consulta = 'SELECT * FROM educadores WHERE correo=?';
    db.get().query(consulta, [pemail], (err, rows) => {
        if(err) return done(err, null);
        done(null, rows);
    })
}

//Busca en la tabla educadores el usuario cuyo id coincide con el del parámetro de búsqueda.
exports.findById = (pId, done) => {
    let consulta = 'SELECT * FROM educadores WHERE id_educador=?';
    db.get().query(consulta, [pId], (err, rows) => {
        if(err) return done(err, null);
        done(null, rows);
    })
}


//Inserta en la tabla educadores un nuevo registro
exports.create = ({nombre, apellidos, email, telefono, contrasena, contrasenaRepeat, centro}, done) => {
    let values = [nombre, apellidos, email, telefono, contrasena, contrasenaRepeat, centro];
    //console.log(values);
    let inserta = 'INSERT INTO educadores (nombre, apellidos, correo, telefono, contrasena, contrasena_repeat, centro) VALUES (?,?,?,?,?,?, ?)';
    db.get().query(inserta, values, (err, result) => {
        if(err) return done(err,null);
        done(null, result);
    });
};

exports.findClassId = (pId, done) => {
    let consulta = 'SELECT clase FROM educadores-clases WHERE educador=?';
    db.get().query(consulta, [pId], (err, rows) => {
        if(err) return done(err, null);
        done(null, rows);
    })
}

//Obtiene las clases de su centro
exports.getClasses = (pId, done) => {
    let consulta = 'SELECT c.id_clase, c.nombre FROM clases as c, educadores as e WHERE c.centro = e.centro AND e.id_educador = ?';
    db.get().query(consulta, [pId], (err, rows) => {
        if(err) return done(err, null);
        done(null, rows);
    })
}