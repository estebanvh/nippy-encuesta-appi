const express = require('express');
const app = express();

app.use(require('./encuesta'));
app.use(require('./usuario'));
app.use(require('./pregunta'));
app.use(require('./respuesta'));

module.exports = app;