var assert = require('assert');
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);


var server = require('../index');

describe('Array', () => {
    describe('#indexOf()', () => {
        it('should return -1 when the value is not present', () => {
            assert.equal([1, 2, 3].indexOf(4), -1);
        })
        it('should return index when given value is present', () => {
            assert.equal([1, 2, 3].indexOf(1), 0);
            assert.equal([1, 2, 3].indexOf(2), 1);
        })
    })
})

describe('index.js', () => {
    it('http get request should response with path text', () => {
        chai.request(server)
            .get('/foo/bar')
            .end((err, resp) => {
                resp.should.have.status(200);
                resp.should.have.property('text', `Hello, World!\nfoo/bar`);
                console.log(resp.text);
            })
        chai.request(server)
            .get('/foo/bar/fizz/buzz')
            .end((err, resp) => {
                resp.should.have.status(200);
                resp.should.have.property('text', `Hello, World!\nfoo/bar/fizz/buzz`);
                console.log(resp.text);
            })
    })
})
