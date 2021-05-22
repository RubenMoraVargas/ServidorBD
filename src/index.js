var http = require('http');

function getdataFromDatabase(callback) {
  var mysql = require('mysql');

  var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'redes2021',
  });

  con.connect(function (err) {
    if (err) throw err;
    return con.query('SELECT estudiante, nota FROM examen', function (err, result) {
      if (err) throw err;
      callback(result);
    });
  });
}

http
  .createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/html' });

    getdataFromDatabase(function callbackDatabase(result) {
      response.end('<h2>' + JSON.stringify(result) + '<h2>');
    });
  })
  .listen(8000);

console.log('Servidor en la url http://127.0.0.1:8000/');
