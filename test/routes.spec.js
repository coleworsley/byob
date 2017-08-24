/* eslint-env mocha */
/* eslint no-unused-expressions: "off" */
const config = require('../knexfile').test;
const knex = require('knex')(config);
const chai = require('chai');
const chaiHttp = require('chai-http');
const { app: server } = require('../server');

// eslint-disable-next-line
const should = chai.should();

chai.use(chaiHttp);

describe('Client Routes', () => {
  it.skip('should return the homepage', (done) => {
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
  // before((done) => {
  //   knex.migrate.rollback()
  //     .then(() => knex.migrate.rollback())
  //     .then(() => knex.migrate.latest())
  //     .then(() => done());
  // });
  //
  // beforeEach((done) => {
  //   knex.seed.run()
  //     .then(() => done());
  // });

  it.skip('should return all the brews', (done) => {
    chai.request(server)
      .get('/api/v1/brews')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.have.property('id');
        res.body[0].should.have.property('abv');
        res.body[0].abv.should.equal(0.066);
        res.body[0].should.have.property('ibu');
        res.body[0].ibu.should.equal(0.11);
        res.body[0].should.have.property('name');
        res.body[0].name.should.equal('Pub Beer');
        res.body[0].should.have.property('style');
        res.body[0].style.should.equal('American Pale Lager');
        res.body[0].should.have.property('ounces');
        res.body[0].ounces.should.equal(12);
        res.body[0].should.have.property('brewery_id');
        res.body[0].brewery_id.should.equal(408);
        done();
      });
  });
  it.skip('should return all the brews', (done) => {
    chai.request(server)
      .get('/api/v1/breweries')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.have.property('id');
        res.body[0].id.should.equal(408);
        res.body[0].should.have.property('name');
        res.body[0].name.should.equal('NorthGate Brewing');
        res.body[0].should.have.property('cit.skipy');
        res.body[0].cit.skipy.should.equal('Minneapolis');
        res.body[0].should.have.property('state');
        res.body[0].state.should.equal('MN');
        done();
      });
  });
});
