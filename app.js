var express = require('express');

var app = express();

app.get('/', function (req, res) {
  res.send('Mu gia xau xi, kho tinh Ngoan Ngong');
});

app.listen(process.env.PORT || 5000);

module.exports = app;
