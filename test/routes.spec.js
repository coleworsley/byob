/* eslint-env mocha */
/* eslint no-unused-expressions: "off" */
const config = require('../knexfile').test;
const knex = require('knex')(config);
const chai = require('chai');
const chaiHttp = require('chai-http');
const { app: server } = require('../src/server');
const jwt = require('jsonwebtoken');

const payload = {
  email: 'bob@gmail.com',
  first_name: 'Robbie',
  last_name: 'Lob',
};
const validToken = jwt.sign(payload, 'test', { expiresIn: '2m' });
const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGhpcyBpcyBmcm9tIFBPU1RNQU4iLCJpYXQiOjE1MDM3Nzc5MjksImV4cCI6MTUwMzc3Nzk4OX0.REuhQ8XUqOE_09YLeyzJVzTxCwSYI0BzYP9J7q_FN64';

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

  describe('ROUTE:: /auth', () => {
    it('POST:: HAPPYPATH should return a valid JWT Token', (done) => {
      chai.request(server)
        .post('/auth')
        .send({
          email: 'bobloblaw@lawbob.bob',
          first_name: 'bobbybobbob',
          last_name: 'loblob',
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.token.should.be.a('string');

          const decoded = jwt.verify(res.body.token, 'test');
          decoded.should.have.property('email');
          decoded.email.should.equal('bobloblaw@lawbob.bob');
          decoded.should.have.property('first_name');
          decoded.first_name.should.equal('bobbybobbob');
          decoded.should.have.property('last_name');
          decoded.last_name.should.equal('loblob');
          done();
        });
    });
    it('POST::SADPATH should return an error if token is invalid', (done) => {
      chai.request(server)
        .post('/api/v1/brews')
        .set('Authorization', invalidToken)
        .send({
          name: 'New Brew',
          style: 'American Pale Lager',
          brewery_id: 408,
          abv: 0.066,
          ibu: 0.11,
          ounces: 12,
        })
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.equal('Invalid token');
          done();
        });
    });
  });

  describe('ROUTE:: /api/v1/brews', () => {
    it('GET:: HAPPYPATH should return all the brews', (done) => {
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
        .set('Authorization', validToken)
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
        .set('Authorization', validToken)
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
        .set('Authorization', validToken)
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
    it('GET::HAPPYPATH should return all the brews', (done) => {
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
    it('GET::SADPATH should return a 404 error if you have the the wrong endpoint', (done) => {
      chai.request(server)
        .get('/api/v1/brewry')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it('GET::HAPPYPATH QUERY PARAMETER should return selected breweries', (done) => {
      chai.request(server)
        .get('/api/v1/breweries?state=KY')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.length.should.equal(1);
          res.body[0].name.should.equal('Against the Grain Brewery');
          done();
        });
    });

    it('POST::SADPATH should return an error if required info Missing', (done) => {
      chai.request(server)
        .post('/api/v1/breweries')
        .set('Authorization', validToken)
        .send({
          city: 'Denver',
          state: 'CO',
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.error.should.equal('Missing required parameter name');
          done();
        });
    });
  });

  describe('ROUTE:: /api/v1/brews/:id', () => {
    it('GET::HAPPYPATH should return a brew', (done) => {
      chai.request(server)
        .get('/api/v1/brews/2265')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property('id');
          res.body.should.have.property('abv');
          res.body.abv.should.equal(0.066);
          res.body.should.have.property('ibu');
          res.body.ibu.should.equal(0.11);
          res.body.should.have.property('name');
          res.body.name.should.equal('Devil\'s Cup');
          res.body.should.have.property('style');
          res.body.style.should.equal('American Pale Ale (APA)');
          res.body.should.have.property('ounces');
          res.body.ounces.should.equal(12);
          res.body.should.have.property('brewery_id');
          res.body.brewery_id.should.equal(177);
          done();
        });
    });

    it('DELETE::HAPPYPATH should delete a specific brew', (done) => {
      chai.request(server)
        .delete('/api/v1/brews/1436')
        .set('Authorization', validToken)
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

    it('PATCH::HAPPYPATH should update 1 or more brew fields', (done) => {
      chai.request(server)
        .patch('/api/v1/brews/2265')
        .set('Authorization', validToken)
        .send({
          name: 'DevilzzCup',
          style: 'AMERICAN',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body[0].should.be.a('object');
          res.body[0].should.have.property('name');
          res.body[0].name.should.equal('DevilzzCup');
          res.body[0].should.have.property('id');
          res.body[0].id.should.equal(2265);
          res.body[0].should.have.property('style');
          res.body[0].style.should.equal('AMERICAN');

          chai.request(server)
            .get('/api/v1/brews/2265')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('name');
              res.body.name.should.equal('DevilzzCup');
              res.body.should.have.property('style');
              res.body.style.should.equal('AMERICAN');
              done();
            });
        });
    });

    it('PATCH::SADPATH should return an error if invalid parameters are passed', (done) => {
      chai.request(server)
        .patch('/api/v1/brews/2265')
        .set('Authorization', validToken)
        .send({ nameeee: 'Best beer ever!' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal('Invalid parameter(s): nameeee');
          done();
        });
    });
  });

  describe('ROUTE:: /api/v1/brewery/:id/brews', () => {
    it('GET::HAPPYPATH should get all the beers that have been added to a brewery', (done) => {
      chai.request(server)
        .get('/api/v1/brewery/177/brews')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body[0].should.have.property('id');
          res.body[0].should.have.property('abv');
          res.body[0].abv.should.equal(0.066);
          res.body[0].should.have.property('ibu');
          res.body[0].ibu.should.equal(0.11);
          res.body[0].should.have.property('name');
          res.body[0].name.should.equal('Devil\'s Cup');
          res.body[0].should.have.property('style');
          res.body[0].style.should.equal('American Pale Ale (APA)');
          res.body[0].should.have.property('ounces');
          res.body[0].ounces.should.equal(12);
          res.body[0].should.have.property('brewery_id');
          res.body[0].brewery_id.should.equal(177);
          done();
        });
    });
  });

  describe('ROUTE:: /api/v1/breweries/:id', () => {
    it('DELETE::HAPPYPATH should delete a brewery and all of the associated brews', (done) => {
      chai.request(server)
        .get('/api/v1/breweries')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.length.should.equal(2);

          chai.request(server)
            .delete('/api/v1/breweries/408')
            .set('Authorization', validToken)
            .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('brewery');
              res.body.brewery.should.have.property('id');
              res.body.brewery.id.should.equal(408);
              res.body.should.have.property('brews');
              res.body.brews.length.should.equal(1);
              res.body.brews[0].should.have.property('id');
              res.body.brews[0].id.should.equal(1436);

              chai.request(server)
                .get('/api/v1/breweries')
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.length.should.equal(1);

                  chai.request(server)
                    .get('/api/v1/brews/1436')
                    .end((err, res) => {
                      res.should.have.status(404);
                      res.body.error.should.equal('Resource does not exist');
                      done();
                    });
                });
            });
        });
    });

    it('DELETE::SADPATH should return an error if the resource doesn\'t exist', (done) => {
      chai.request(server)
        .delete('/api/v1/breweries/100')
        .set('Authorization', validToken)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('error');
          res.body.error.should.equal('Resource does not exist');
          done();
        });
    });

    it('PATCH::HAPPYPATH should update 1 or more brewery fields', (done) => {
      chai.request(server)
        .patch('/api/v1/breweries/408')
        .set('Authorization', validToken)
        .send({ name: 'Brand New BREWSKI!' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.name.should.equal('Brand New BREWSKI!');
          res.body.should.have.property('id');
          res.body.id.should.equal(408);
          res.body.should.have.property('city');
          res.body.city.should.equal('Minneapolis');
          res.body.should.have.property('state');
          res.body.state.should.equal('MN');

          chai.request(server)
            .get('/api/v1/breweries')
            .end((err, res) => {
              res.should.have.status(200);
              res.body[1].should.have.property('name');
              res.body[1].name.should.equal('Brand New BREWSKI!');
              done();
            });
        });
    });

    it('PATCH::SADPATH should return an error if invalid parameters are passed', (done) => {
      chai.request(server)
        .patch('/api/v1/breweries/408')
        .set('Authorization', validToken)
        .send({ nameeee: 'Brand New BREWSKI!' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal('Invalid parameter(s): nameeee');
          done();
        });
    });
  });
});
