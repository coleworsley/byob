/* eslint-env mocha */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

// eslint-disable-next-line
const should = chai.should();

chai.use(chaiHttp);

describe('Client Routes', () => {
  it.skip('should return the homepage', (done) => {
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
