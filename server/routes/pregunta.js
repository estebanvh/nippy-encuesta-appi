const express = require('express');
const Pregunta = require('../models/pregunta');
const _ = require('underscore');

const app = express();


//========================================
// Devuelve todas las preguntas existentes
//========================================
app.get('/preguntas', (req, res) => {

    Pregunta.find()
        .populate('usuario', 'nombre email estado')
        .populate('encuesta', 'nombre fechaInicio fechaFin activa')
        .exec((err, preguntasDB) => {


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
                preguntas: preguntasDB,
                total: preguntasDB.length
            })

        })

});

//========================================
// Devuelve todas las preguntas existentes
//========================================

app.get('/preguntas/:id', (req, res) => {

    let idEncuesta = req.params.id;

    Pregunta.find({ 'encuesta': idEncuesta })
        .populate('usuario', 'nombre email estado')
        .populate('encuesta', 'nombre fechaInicio fechaFin activa')
        .exec((err, preguntasDB) => {

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
                preguntas: preguntasDB,
                total: preguntasDB.length
            })
        })


});

app.post('/crear-pregunta', (req, res) => {

    let body = _.pick(req.body, ['descripcion', 'encuesta', 'usuario']);
    body.fechaCreacion = new Date().getTime();

    let pregunta = new Pregunta(body);

    pregunta.save((err, preguntaDB) => {

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
            pregunta: preguntaDB
        })


    })

})

module.exports = app;