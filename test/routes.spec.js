/* eslint-env mocha */
/* eslint no-unused-expressions: "off" */
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

  beforeEach((done) => {
    db.seed.run()
      .then(() => done());
  });

  it('should return all the brews', (done) => {
    chai.request(server)
      .get('/api/v1/brews')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.have.property('id');
        res.body[0].should.have.property('abv');
        res.body[0].abv.should.equal('0.05');
        res.body[0].should.have.property('ibu');
        res.body[0].ibu.should.equal('0.11');
        res.body[0].should.have.property('name');
        res.body[0].name.should.equal('Pub Beer');
        res.body[0].should.have.property('style');
        res.body[0].style.should.equal('American Pale Lager');
        res.body[0].should.have.property('ounces');
        res.body[0].ounces.should.equal('12');
        res.body[0].should.have.property('brewery_id');
        res.body[0].brewery_id.should.equal(408);
        done();
      });
  });
});
