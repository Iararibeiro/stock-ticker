import 'mocha';
import * as fs from 'fs';
import * as chai from 'chai';
import path = require('path');
import * as supertest from 'supertest';
import * as utils from '../src/utils/util';

const expect = chai.expect;
const should = chai.should();
const server = supertest.agent('localhost:4000');

/** Start testing the file upload */
describe('Test upload file', () => {
  it('Test file upload with missing info', (done) => {
    server.put('/file/upload')
      .attach('', path.resolve(__dirname,'dow_jones_index_testing.data'))
      .expect(500)
      .end((err, res) => {
        res.status.should.equal(500);
        res.text.should.equal('{"error":"Incorrent parameters, file information not found"}');
        let fileExists = fs.existsSync('./data/dow_jones_index_testing.data');
        fileExists.should.equal(false);
        done();
      })
  });
  
  it('Test file upload', (done) => {
    server.put('/file/upload')
      .attach('file', path.resolve(__dirname,'dow_jones_index_testing.data'))
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.text.should.equal('{"message":"file received"}');
        let fileExists = fs.existsSync('./data/dow_jones_index_testing.data');
        fileExists.should.equal(true);
        done();
      })
  });
});

/** Start testing search */
describe('Test search', () => {
  it('Test search if file doesnt exists', (done) => {
    server.get('/search/test/notfound.data')
      .expect(404)
      .end((err, res) => {
        res.status.should.equal(404);
        res.text.should.equal('{"error":"file not found"}');
        let fileExists = fs.existsSync('./data/notfound.data');
        fileExists.should.equal(false);
        done();
      })
  });
  
  it('Test search for a not found term', (done) => {
    server.get('/search/test/dow_jones_index_testing.data')
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        let result = JSON.parse(res.text);
        result.length.should.equal(0);
        done();
      })
  });
  
  it('Test search for an existing stock', (done) => {
    server.get('/search/AA/dow_jones_index_testing.data')
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        let result = JSON.parse(res.text);
        result.should.not.equal([]);
        let resultSize = result.length;
        resultSize.should.greaterThan(0);
        done();
      })
  });
});

/** Testing utils functions */
describe('Test util common function', () => {
  it('Test formatPath', () => {
    let result = utils.formatPath('');
    result.should.equal('./');
    let resultPath = utils.formatPath('data/filePath');
    resultPath.should.not.equal(null);
    resultPath.should.equal('./data/filePath');
  });

  it(' Test getFilePath', () => {
    let result = utils.getFilePath('dow_jones_index.data');
    result.should.equal('./data/dow_jones_index.data');
  })
});

