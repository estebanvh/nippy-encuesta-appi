require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

app.use(require('./routes/routes'));

app.listen(process.env.PORT, () => {

    console.log('Servidor arriba', process.env.PORT);

    mongoose.connect(process.env.URI_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        },
        (err) => {

            if (err) {
                console.log(err);
                throw err;
            }
            console.log('Base de datos online');
        })

})