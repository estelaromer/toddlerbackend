var express = require('express');
var router = express.Router();
let db = require('../db');
let modelAlumno = require('../models/alumnos');
let modelClase = require('./../models/clases');
let modelFamiliar = require('../models/familiares');
let modelEducador = require('../models/educadores');

//Ruta: /api/personas/index
/*router.get('/personas/index', (req, res) => {
    modelPersona.index((err, rows) => {
        if(err) return console.log(err.message)
        res.json(rows);
    });
});

//Ruta: /api/personas/show/3
router.get('/personas/show/:id', (req, res) => {
    let idPersona = req.params.id;
    modelPersona.show(idPersona, (err, row) => {
        if(err) return console.log(err.message)
        res.json(row);
    });
})*/

//Ruta: /api/familiares/create
router.post('/familiares/create', (req, res) => {
    modelFamiliar.findByEmail(req.body.param1.correo, (err, rows) => {
        if (err) return console.log(err.message)
        if (rows.length === 0) {
            modelFamiliar.create({
                nombre: req.body.param1.nombre,
                apellidos: req.body.param1.apellidos,
                correo: req.body.param1.correo,
                telefono: req.body.param1.telefono,
                contrasena: req.body.param1.contrasena,
                contrasenaRepeat: req.body.param1.contrasenaRepeat
            }, (err, result) => {
                if (err) {
                    console.log(err.message);
                    res.json({ error: 'Registro KO' })
                } else {
                    res.json({ success: 'Registro OK' });
                }
            })
        } else {
            res.json({ err: 'Usuario ya registrado' })
        }
    })
})

//Ruta: /api/educadores/create
router.post('/educadores/create', (req, res) => {
    modelEducador.findByEmail(req.body.param1.correo, (err, rows) => {
        if (err) return console.log(err.message)
        if (rows.length === 0) {
            modelEducador.create({
                nombre: req.body.param1.nombre,
                apellidos: req.body.param1.apellidos,
                correo: req.body.param1.correo,
                telefono: req.body.param1.telefono,
                contrasena: req.body.param1.contrasena,
                contrasenaRepeat: req.body.param1.contrasenaRepeat
            }, (err, result) => {
                if (err) {
                    console.log(err.message);
                    res.json({ error: 'Registro KO' })
                } else {
                    res.json({ success: 'Registro OK' });
                }
            })
        } else {
            res.json({ err: 'Usuario ya registrado' })
        }
    })
})

//Ruta: /api/alumnos/create
router.post('/alumnos/create', (req,res) => {
    let datos = req.body.pdatosRegistro
    let codigo = datos.codigoAlumno
    let idFamiliar = datos.idFamiliar
    modelClase.findClaseByCodigoAlumno(codigo, (err, rows) => {
        if (err) return console.log(err.message)
        if(rows.length === 0){
            console.log('No existe')
            res.json({error: 'Código incorrecto'})
        } else {
            console.log('La clase existe')
            console.log(rows[0].id_clase)
            modelAlumno.create({
                clase: rows[0].id_clase,
                foto: datos.foto,
                nombre: datos.nombre,
                apellidos: datos.apellidos,
                fecha_nacimiento: datos.fechaNacimiento,
                hora_entrada: datos.horaEntrada,
                hora_salida: datos.horaSalida
            }, (err, result) => {
                if (err) {
                    console.log(err.message);
                    res.json({ error: 'Registro KO' })
                } else {
                    let alumnoId = result.insertId
                    modelAlumno.linkarFamiliar({
                        alumno: alumnoId, 
                        familiar: idFamiliar
                    }, (err, result) => {
                        if(err){
                            console.log(err.message)
                            //To do: modelAlumno.delete()
                            res.json({error: 'Registro KO'})
                        } else {
                            res.json({success: 'Registro OK'})
                        }
                    })
            
                }
            })
        }
    })
})


//Ruta: /api/alumnos/fetch
router.post('/alumnos/fetch', (req,res) => {
    console.log(req.body)
    let id = req.body.datos.idUsuario
    let tipoUsuario = req.body.datos.tipoUsuario
    console.log(id)
    console.log(tipoUsuario)
    if(tipoUsuario === 'familiares') {
        
    }
    res.json('Entro')
})

//Ruta: /api/loginmatch
router.post('/loginmatch', (req, res) => {
    let usuario = req.body.tipoLogin;
    let email = req.body.correo;
    let pswd = req.body.contrasena;
    if (usuario === 'familiares') {
        getFamiliarByEmail(email, pswd, res);
    } else {
        getEducadorByEmail(email, pswd, res);
    }
})

router.post('/fetch/:id', (req, res) => {
    let id = req.params.id;
    let usuario = req.body.param1;
    console.log(id);
    console.log(usuario);
    if (usuario === 'familiares') {
        getFamiliarProfileById(id, res);
    } else {
        getEducadorProfileById(id, res);
    }
})

/*function getFamiliarProfileById(id,res){
    modelFamiliar.findById(id, (err, rows) => {
        if(err) return console.log(err.message)
        if(rows.length === 0) {
            res.json({err : 'Usuario no registrado'})
        } else {
            let familiar = rows[0];
            res.json({
                'Nombre': familiar.nombre, 
                'Apellidos': familiar.apellidos,
                'Email': familiar.correo,
                'Telefono': familiar.telefono,
                'Direccion': familiar.direccion,
                'Ciudad': familiar.ciudad,
                'CódigoPostal': familiar.codigo_postal,
                'Foto': familiar.foto
            });
        }
    })
}*/


/*function getFamiliarProfileById(id, res) {
    modelFamiliar.findById(id, (err, rows) => {
        if (err) return console.log(err.message)
        if (rows.length === 0) {
            res.json({ err: 'Usuario no registrado' })
        } else {
            let familiar = {
                'nombre': rows[0].nombre,
                'apellidos': rows[0].apellidos,
                'email': rows[0].correo,
                'telefono': rows[0].telefono,
                'direccion': rows[0].direccion,
                'ciudad': rows[0].ciudad,
                'codigoPostal': rows[0].codigo_postal,
                'foto': rows[0].foto,
            }
            modelFamiliar.findToddlerIds(id, (err, rows) => {
                if (err) return console.log(err.message)
                if (rows.length === 0) {
                    console.log('No tiene alumnos')
                    res.json(familiar)
                } else {
                    console.log(rows.length)
                    let counter = rows.length
                    let i = 0
                    modelAlumno.findById(rows[i].alumno, (err, rows) => {
                        if (err) return console.log(err.message)
                        if (rows.length === 0) {
                            console.log('Problema recogiendo datos de alumnos')
                        } else {
                            let alumno = {
                                'nombre': rows[0].nombre,
                                'apellidos': rows[0].apellidos,
                                'horario': rows[0].horario,
                                'clase': rows[0].clase
                            }
                            familiar.alumno = alumno
                            res.json(familiar)
                        }
                    })

                }
            })
        }
    })
}*/

function getFamiliarProfileById(id, res) {
    modelFamiliar.findById(id, (err, rows) => {
        if (err) return console.log(err.message)
        if (rows.length === 0) {
            res.json({ err: 'Usuario no registrado' })
        } else {
            let familiar = {
                'nombre': rows[0].nombre,
                'apellidos': rows[0].apellidos,
                'email': rows[0].correo,
                'telefono': rows[0].telefono,
                'direccion': rows[0].direccion,
                'ciudad': rows[0].ciudad,
                'codigoPostal': rows[0].codigo_postal,
                'foto': rows[0].foto,
            }
            modelAlumno.findAlumnosByFamiliarId(id, (err, rows) => {
                if(err) return console.log(err.message)
                if(rows.length === 0) {
                    console.log('No tiene alumnos')
                    res.json(familiar)
                } else {
                    familiar.alumnos = rows
                    res.json(familiar)
                }
            })
        }
    })
}

function getEducadorProfileById(id, res) {
    modelEducador.findById(id, (err, rows) => {
        if (err) return console.log(err.message)
        if (rows.length === 0) {
            res.json({ err: 'Usuario no registrado' })
        } else {
            let educador = {
                'nombre': rows[0].nombre,
                'apellidos': rows[0].apellidos,
                'email': rows[0].correo,
                'telefono': rows[0].telefono,
                'foto': rows[0].foto
            }
            modelClase.findClasesByEducadorId(id, (err, rows) => {
                if(err) return console.log(err.message)
                if(rows.length === 0) {
                    console.log('No tiene clase')
                    res.json(educador)
                } else {
                    educador.clases = rows
                    res.json(educador)
                }
            })
        }
    })
}

function getFamiliarByEmail(email, pswd, res) {
    modelFamiliar.findByEmail(email, (err, rows) => {
        if (err) return console.log(err.message)
        if (rows.length === 0) {
            res.json({ err: 'Usuario no registrado' })
        } else {
            if (pswd !== rows[0].contrasena) {
                res.json({ err: 'Contraseña incorrecta' });
            } else {
                let familiar = rows[0];
                res.json({ 'id': familiar.id_familiar });
            }
        }
    })
}

function getEducadorByEmail(email, pswd, res) {
    modelEducador.findByEmail(email, (err, rows) => {
        if (err) return console.log(err.message)
        if (rows.length === 0) {
            res.json({ err: 'Usuario no registrado' })
        } else {
            if (pswd !== rows[0].contrasena) {
                res.json({ err: 'Contraseña incorrecta' });
            } else {
                let educador = rows[0];
                res.json({ 'id': educador.id_educador });
            }
        }
    })
}

//Ruta: /api/personas/destroy
/*router.delete('/personas/destroy', (req,res) => {
    let idPersona = req.body.id;
    modelPersona.destroy(idPersona, (err, result) => {
        if(err) return console.log(err.message);
        res.json({success: 'Se ha eliminado el registro'})
    })
})

//Ruta: /api/personas/update
router.patch('/personas/update', (req,res) => {
    modelPersona.update(req.body.id, {
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        edad: req.body.edad
    }, (err, result) => {
        if(err) return console.log(err.message);
        res.json({success: 'se ha actualizado el registro'})
    })
})*/

module.exports = router;
