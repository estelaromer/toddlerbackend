//Representa las acciones contra la tabla familiares

let db = require('../db');

//lista todas las filas encontradas en la tabla familiares
exports.index = (done) => {
    let consulta = 'SELECT * FROM familiares';
    db.get().query(consulta, (err, rows) => {
        if (err) return done(err, null);
        done(null, rows);
    });
};

/*
exports.find = (idPersona, done) => {
    let consulta = 'SELECT * FROM familiares WHERE id_familiar=?';
    db.get().query(consulta, [idFamiliar], (err,rows) => {
        if(err) return done(err,null);
        done(null, rows[0]);
    });
};
*/

//Busca en la tabla familiares si existe un usuario con el email proporcionado en el form de login.
exports.findByEmail = (pemail, done) => {
    let consulta = 'SELECT * FROM familiares WHERE correo=?';
    db.get().query(consulta, [pemail], (err, rows) => {
        if(err) return done(err, null);
        done(null, rows);
    })
}


//Busca en la tabla familiares el usuario con el id que coincide con el del parámetro
exports.findById = (pId, done) => {
    let consulta = 'SELECT * FROM familiares WHERE id_familiar=?';
    db.get().query(consulta, [pId], (err, rows) => {
        if(err) return done(err, null);
        done(null, rows);
    })
}

//Inserta un nuevo familiar en la tabla familiares
exports.create = ({nombre, apellidos, email, telefono, contrasena, contrasenaRepeat}, done) => {
    let values = [nombre, apellidos, email, telefono, contrasena, contrasenaRepeat];
    console.log(values);
    let inserta = 'INSERT INTO familiares (nombre, apellidos, correo, telefono, contrasena, contrasena_repeat) VALUES (?,?,?,?,?,?)';
    db.get().query(inserta, values, (err, result) => {
        console.log(values);
        if(err) return done(err,null);
        done(null, result);
    });
};

/*exports.findToddlerIds = (pId, done) => {
    let consulta = 'SELECT alumno FROM familiaresalumnos WHERE familiar=?';
    db.get().query(consulta, [pId], (err,rows) => {
        if(err) return done(err, null);
        done(null, rows);
    })
}*/

/*exports.destroy = (idPersona, done) => {
    let elimina = 'DELETE FROM personas where idpersona=?';
    db.get().query(elimina, [idPersona], (err, result) => {
        if(err) return done (err, null);
        done(null, result);
    });
};

exports.update = (idPersona, {nombre, apellidos, edad}, done) => {
    let actualiza= 'UPDATE testdb.personas SET nombre=?, apellidos=?, edad =? WHERE idpersona=?'
    db.get().query(actualiza, [nombre,apellidos,edad,idPersona], (err, result) => {
        if (err) return done(err,null)
        done(null, result)
    })
}*/
