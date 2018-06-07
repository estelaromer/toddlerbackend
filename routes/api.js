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
    modelFamiliar.find(req.body.param1.correo, (err, row) => {
        if(err) return console.log(err.message)
        if(row.length === 0) {
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
    modelEducador.find(req.body.param1.correo, (err, row) => {
        if(err) return console.log(err.message)
        if(row.length === 0) {
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
        modelFamiliar.find(email, (err, row) => {
            if(err) return console.log(err.message)
            if(row.length === 0) {
                res.json({err : 'Usuario no registrado'})
            } else {
                if(pswd !== row[0].contrasena) {
                    res.json({err: 'Contraseña incorrecta'});
                } else {
                    res.json(row);
                }
            }
        })
    } else {
        modelEducador.find(email, (err, row) => {
            if(err) return console.log(err.message)
            if(row.length === 0) {
                res.json({err : 'Usuario no registrado'})
            } else {
                if(pswd !== row[0].contrasena) {
                    res.json({err: 'Contraseña incorrecta'});
                } else {
                    res.json(row);
                }
            }
        })
    }
})

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
