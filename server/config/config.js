//=============
//Puerto donde se despliega la aplicación
//=============
process.env.PORT = process.env.PORT || 3000;

//=============
//Ambiente
//=============
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//=============
//URL DATABASE
//=============
let dataBaseURL;

if (process.env.NODE_ENV === 'dev') {
    dataBaseURL = 'mongodb://localhost:27017/nippy-encuesta';
} else {
    dataBaseURL = process.env.URI_DB;
}


process.env.URI_DB = dataBaseURL;