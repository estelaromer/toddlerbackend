var express = require('express');
var router = express.Router();
let db = require('../db');
let modelAlumno = require('../models/alumnos');
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
        if(err) return console.log(err.message)
        if(rows.length === 0) {
            modelFamiliar.create({
                nombre: req.body.param1.nombre,
                apellidos: req.body.param1.apellidos,
                correo: req.body.param1.correo,
                telefono: req.body.param1.telefono,
                contrasena: req.body.param1.contrasena,
                contrasenaRepeat: req.body.param1.contrasenaRepeat
            }, (err, result) => {
                if(err) {
                    console.log(err.message);
                    res.json({error: 'Registro KO'})
                } else {
                    res.json({success: 'Registro OK'});
                }
            })
        } else {
            res.json({err: 'Usuario ya registrado'})
        }
    })
})

//Ruta: /api/educadores/create
router.post('/educadores/create', (req, res) => {
    modelEducador.findByEmail(req.body.param1.correo, (err, rows) => {
        if(err) return console.log(err.message)
        if(rows.length === 0) {
            modelEducador.create({
                nombre: req.body.param1.nombre,
                apellidos: req.body.param1.apellidos,
                correo: req.body.param1.correo,
                telefono: req.body.param1.telefono,
                contrasena: req.body.param1.contrasena,
                contrasenaRepeat: req.body.param1.contrasenaRepeat
            }, (err, result) => {
                if(err) {
                    console.log(err.message);
                    res.json({error: 'Registro KO'})
                } else {
                    res.json({success: 'Registro OK'});
                }
            })
        } else {
            res.json({err: 'Usuario ya registrado'})
        }
    })
})

//Ruta: /api/loginmatch
router.post('/loginmatch', (req, res) => {
    let usuario = req.body.tipoLogin;
    let email = req.body.correo;
    let pswd = req.body.contrasena;
    if (usuario === 'familiares') {
        getFamiliarByEmail(email,pswd,res);
    } else {
        getEducadorByEmail(email,pswd,res);
    }
})

router.post('/fetch/:id', (req,res) => {
    let id = req.params.id;
    let usuario = req.body.param1;
    console.log(id);
    console.log(usuario);
    if(usuario === 'familiares') {
        getFamiliarProfileById(id, res);
    } else {
        getEducadorProfileById(id,res);
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

function getFamiliarProfileById(id,res){
    modelFamiliar.findById(id, (err, rows) => {
        if(err) return console.log(err.message)
        if(rows.length === 0) {
            res.json({err : 'Usuario no registrado'})
        } else {
            var familiar = {
                'nombre': rows[0].nombre,
                'apellidos': rows[0].apellidos,
                'email': rows[0].correo,
                'telefono': rows[0].direccion,
                'ciudad': rows[0].ciudad,
                'codigoPostal': rows[0].codigo_postal,
                'foto': rows[0].foto,
                'alumnos': []
            }
            modelFamiliar.findToddlerIds(id, (err, rows) => {
                if(err) return console.log(err.message)
                if(rows.length === 0) {
                    console.log('No tiene alumnos')
                    res.json(familiar)
                } else{
                    console.log(rows.length)
                    for (let i=0; i < rows.length; i++) {
                        modelAlumno.findById(rows[i].alumno, (err, trows) => {
                            if(err) return console.log(err.message)
                            if(trows.length === 0) {
                                console.log('Problema recogiendo datos de alumnos')
                            } else {
                                familiar.alumnos.push(JSON.parse(JSON.stringify(trows[0])))
                                console.log(familiar)

                            }
                        })
                    }
                    res.json(familiar)
                }
            })
        }
    })
}

function getEducadorProfileById(id,res) {
    modelEducador.findById(id, (err,rows) => {
        if(err) return console.log(err.message)
        if(rows.length === 0) {
            res.json({err : 'Usuario no registrado'})
        } else {
            let educador = rows[0];
            res.json({
                'Nombre': educador.nombre, 
                'Apellidos': educador.apellidos,
                'Email': educador.correo,
                'Telefono': educador.telefono,
                'Foto': educador.foto
            });
        }
    })
}

function getFamiliarByEmail(email,pswd, res){
    modelFamiliar.findByEmail(email, (err, rows) => {
        if(err) return console.log(err.message)
        if(rows.length === 0) {
            res.json({err : 'Usuario no registrado'})
        } else {
            if(pswd !== rows[0].contrasena) {
                res.json({err: 'Contraseña incorrecta'});
            } else {
                let familiar = rows[0];
                res.json({'id': familiar.id_familiar});
            }
        }
    })
}

function getEducadorByEmail(email, pswd, res){
    modelEducador.findByEmail(email, (err, rows) => {
        if(err) return console.log(err.message)
        if(rows.length === 0) {
            res.json({err : 'Usuario no registrado'})
        } else {
            if(pswd !== rows[0].contrasena) {
                res.json({err: 'Contraseña incorrecta'});
            } else {
                let educador = rows[0];
                res.json({'id': educador.id_educador});
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
