const supertest = require('supertest');

//require('../server.js');
const api = supertest('http://localhost:3000');

const chai = require('chai');
const expect = chai.expect;

const validator = require('./validate');

describe('CRUD operatons', () => {
  describe('GET list', () => {
    it('/Get list of ingredients', (done) => {
      api.get('/ingredients')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          expect(validator.validate({
            path: '/ingredients',
            method: 'get',
            status: '200',
            value: res.body
          })).to.be.null;

          done();
        });
    });
  })
})
