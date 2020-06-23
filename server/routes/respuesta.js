const express = require('express');
const app = express();

const Respuesta = require('../models/respuesta');

app.post('/ingresar-respuesta', (req, res) => {

    let respuestas = req.body.respuestas;
    console.log(respuestas[0]);


    Respuesta.insertMany(respuestas, (err, respuestasDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                description: {
                    message: 'Se ha producido un error, ver detalle',
                    err
                }
            })
        }

        if (!respuestasDB) {
            return res.status(400).json({
                ok: false,
                description: {
                    message: 'No se ha encontrado el recurso'
                }
            })
        }

        res.json({
            ok: true,
            description: {
                message: 'Solicitud ejecutada correctamente'
            },
            respuestas: respuestasDB,
            registrosInsertados: respuestasDB.length
        })

    })


})

module.exports = app;