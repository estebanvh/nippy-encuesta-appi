const express = require('express');
const _ = require('underscore');
const app = express();
let Encuesta = require('../models/encuesta');



//===========================
//obtener todas las encuestas.
//Puede ser filtradas según si estan activas
// o retornar todas las encuestas registradas
//===========================

app.get('/encuestas', (req, res) => {

    let activa = (req.query.activa) ? { activa: req.query.activa } : {};

    Encuesta.find(activa)
        .populate('usuario', 'nombre email rol estado')
        .exec((err, encuestasDB) => {

            // error al realizar consulta
            if (err) {

                return res.status(500).json({
                    ok: false,
                    description: {
                        message: 'Se ha producido un error 500',
                        err
                    }
                });

            }

            //si no hay registros
            if (!encuestasDB) {

                return res.status(400).json({
                    ok: true,
                    description: {
                        message: 'no se encontro el recurso'
                    },
                    encuestas: encuestasDB,
                    total: encuestasDB.length
                })
            }

            // existen registros
            res.json({
                ok: true,
                description: {
                    message: 'Consulta realiza ok'
                },
                encuestas: encuestasDB,
                total: encuestasDB.length
            })


        })


});

//=================
// crear encuesta
//=================
app.post('/crear-encuesta', (req, res) => {

    let body = _.pick(req.body, ['nombre', 'descripcion', 'fechaInicio', 'fechaFin', 'activa', 'usuario']);
    body.fechaCreacion = new Date().getTime();;

    let encuesta = new Encuesta(body);

    encuesta.save((err, encuestaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                description: {
                    message: 'Se ha producido un error, revisar detalle',
                    err
                }
            })
        }

        if (!encuestaDB) {
            return res.status(400).json({
                ok: false,
                description: {
                    message: 'No se encontro el recurso'
                }
            })
        }

        res.json({
            ok: true,
            description: {
                message: 'Se ha ejecutado correctamente su solicitud'
            },
            encuesta: encuestaDB
        })

    })

});

//====================
// Actualizar encuesta
//====================
app.put('/actualizar-encuesta/:id', (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['fechaInicio', 'fechaFin', 'activa', 'descripcion', 'nombre']);

    Encuesta.findByIdAndUpdate(id, body, { new: true }, (err, preguntaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                description: {
                    message: 'Se ha producido un error, ver detalle',
                    err
                }
            })
        }

        if (!preguntaDB) {
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
            pregunta: preguntaDB
        })

    })

})

module.exports = app;