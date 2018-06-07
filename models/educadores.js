//Representa las acciones contra la tabla educadores

let db = require('../db');

//Busca en la tabla familiares si existe un usuario con el email proporcionado en el form de login.
exports.find = (pemail, done) => {
    let consulta = 'SELECT * FROM educadores WHERE correo=?';
    db.get().query(consulta, [pemail], (err, rows) => {
        if(err) return done(err, null);
        done(null, rows);
    })
}

exports.create = ({nombre, apellidos, correo, telefono, contrasena, contrasenaRepeat}, done) => {
    let values = [nombre, apellidos, correo, telefono, contrasena, contrasenaRepeat];
    console.log(values);
    let inserta = 'INSERT INTO educadores (nombre, apellidos, correo, telefono, contrasena, contrasena_repeat) VALUES (?,?,?,?,?,?)';
    db.get().query(inserta, values, (err, result) => {
        console.log(values);
        if(err) return done(err,null);
        done(null, result);
    });
};