
const config = require('./config.json');
const supertest = require('supertest');
const { expect } = require('chai');
const server = supertest.agent(config.server);

// VARIABLES

const modelName = 'spotify';

// TEST FUNCTION

describe('Testing entrypoint: /topFilters' + modelName, function () {

  it('get ' + modelName + ' should return 200', function (done) {
    server
      .get('spotify/topFilters')
      .expect(200)
      .expect('Content-type', /json/)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        expect(res.status).to.equal(200);
        done();
      });
  });
});

describe('Testing entrypoint: /artistAlbums' + modelName, function () {

  it('get artistAlbums, model' + modelName + ' should return 200', function (done) {
    server
      .get('spotify/artistAlbums?name=shakira')
      .expect(200)
      .expect('Content-type', /json/)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('result');
        expect(res.body.result[0]).to.have.all.keys('name', 'release_date', 'total_tracks');
        done();
      });
  });

  it('get artistAlbums, model' + modelName + ' should return 200', function (done) {
    server
      .get('spotify/artistAlbums?name=hjghjgjg')
      .expect(200)
      .expect('Content-type', /json/)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.result.length).to.equal(0);
        done();
      });
  });
});

describe('Testing entrypoint: /topTracks' + modelName, function () {

  it('get topTracks, model' + modelName + ' should return 200', function (done) {
    server
      .get('spotify/topTracks?id=0TnOYISbd1XYRBk9myaseg')
      .expect(200)
      .expect('Content-type', /json/)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('result');
        expect(res.body.result[0]).to.have.all.keys('artist_name', 'release_date', 'track_name', 'total_tracks');
        done();
      });
  });

  it('get artistAlbums, model' + modelName + ' should return 400', function (done) {
    server
      .get('spotify/topTracks?id=aasdsadasda')
      .expect(400)
      .expect('Content-type', /json/)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});