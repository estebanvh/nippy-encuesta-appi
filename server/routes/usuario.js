const express = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');

const _ = require('underscore');

let app = express();


//==============
// Listar usuarios
//==============
app.get('/usuarios', (req, res) => {

    Usuario.find((err, usuariosDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                description: {
                    message: 'Se ha producido un error, ver detalle',
                    err
                }
            })
        }

        res.json({
            ok: true,
            description: {
                message: 'Solicitud ejecutada correctamente'
            },
            usuarios: usuariosDB,
            total: usuariosDB.length
        })

    })

})


//==============
// crear usuario
//==============

app.post('/crear-usuario', (req, res) => {

    let body = _.pick(req.body, ['nombre', 'email', 'password', 'estado', 'rol']);
    body.fechaCreacion = new Date().getTime();
    body.password = bcrypt.hashSync(body.password, 10);

    let usuario = new Usuario(body);

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                description: {
                    message: 'Se ha producido un error, ver detalle',
                    err
                }
            })
        }

        res.json({
            ok: true,
            description: {
                message: 'Solicitud ejecutada correctamente'
            },
            usuario: usuarioDB
        })

    });

})

module.exports = app;