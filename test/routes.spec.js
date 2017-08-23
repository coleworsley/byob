/* eslint-env mocha */
const chai = require('chai');
const chaiHttp = require('chai-http');
const { app: server, db } = require('../server');

// eslint-disable-next-line
const should = chai.should();

chai.use(chaiHttp);

describe('Client Routes', () => {
  it('should return the homepage', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        // eslint-disable-next-line
        res.should.be.html;
        done();
      });
  });
});

describe('API Routes', () => {
  before((done) => {
    db.migrate.latest()
      .then(() => done());
  });

  it('should return all the brews', (done) => {
    chai.request(server)
      .get('/api/v1/brews')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
