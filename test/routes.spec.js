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
    knex.migrate.rollback()
      .then(() => knex.migrate.latest())
      .then(() => done());
  });

  beforeEach((done) => {
    knex.seed.run()
      .then(() => done());
  });

  describe('ROUTE:: /api/v1/brews', () => {
    it('GET:: should return all the brews', (done) => {
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

    it('POST::HAPPYPATH it should post a new brew', (done) => {
      chai.request(server)
        .post('/api/v1/brews')
        .send({
          name: 'New Brew',
          style: 'American Pale Lager',
          brewery_id: 408,
          abv: 0.066,
          ibu: 0.11,
          ounces: 12,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.should.be.json;
          res.body.should.have.property('id');
          res.body.should.have.property('abv');
          res.body.abv.should.equal(0.066);
          res.body.should.have.property('ibu');
          res.body.ibu.should.equal(0.11);
          res.body.should.have.property('name');
          res.body.name.should.equal('New Brew');
          res.body.should.have.property('style');
          res.body.style.should.equal('American Pale Lager');
          res.body.should.have.property('ounces');
          res.body.ounces.should.equal(12);
          res.body.should.have.property('brewery_id');
          res.body.brewery_id.should.equal(408);
          done();
        });
    });

    it('POST::SADPATH should return an error if theres missing parameters', (done) => {
      chai.request(server)
        .post('/api/v1/brews')
        .send({
          name: 'New Brew',
          style: 'American Pale Lager',
          abv: 0.066,
          ibu: 0.11,
          ounces: 12,
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.error.should.equal('Missing required parameter brewery_id');
          done();
        });
    });

    it('POST::SADPATH should return a 404 error if endpoint is incorrect', (done) => {
      chai.request(server)
        .post('/api/v1/brew')
        .send({
          name: 'New Brew',
          style: 'American Pale Lager',
          brewery_id: 408,
          abv: 0.066,
          ibu: 0.11,
          ounces: 12,
        })
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe('ROUTE:: /api/v1/breweries', () => {
    it('GET:: should return all the brews', (done) => {
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
          res.body[0].should.have.property('city');
          res.body[0].city.should.equal('Minneapolis');
          res.body[0].should.have.property('state');
          res.body[0].state.should.equal('MN');
          done();
        });
    });
  });

  describe('ROUTE:: /api/v1/brews/:id', () => {
    it('DELETE:: should delete a specific brew', (done) => {
      chai.request(server)
        .delete('/api/v1/brews/1436')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('abv');
          res.body.abv.should.equal(0.066);
          res.body.should.have.property('ibu');
          res.body.ibu.should.equal(0.11);
          res.body.should.have.property('name');
          res.body.name.should.equal('Pub Beer');
          res.body.should.have.property('style');
          res.body.style.should.equal('American Pale Lager');
          res.body.should.have.property('ounces');
          res.body.ounces.should.equal(12);
          res.body.should.have.property('brewery_id');
          res.body.brewery_id.should.equal(408);
          done();
        });
    });
  });
});
