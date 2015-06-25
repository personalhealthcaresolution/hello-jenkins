var request = require('supertest');
var app = require('../app.js');

describe('GET /', function() {
  it('respond with hello world', function(done) {
    request(app).get('/').expect('Mu gia xau xi, kho tinh Ngoan Ngong', done);
  });
});
