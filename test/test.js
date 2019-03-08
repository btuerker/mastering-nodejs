var assert = require('assert');
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();

var server = require('../index');

chai.use(chaiHttp);

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

// describe('index.js', () => {
//     it('http get request should response with path text', () => {
//         chai.request(server)
//             .get('/foo/bar')
//             .end((err, resp) => {
//                 resp.should.have.status(200);
//                 resp.should.have.property('text', `Hello, World!\nfoo/bar`);
//                 console.log(resp.text);
//             })
//         chai.request(server)
//             .get('/foo/bar/fizz/buzz')
//             .end((err, resp) => {
//                 resp.should.have.status(200);
//                 resp.should.have.property('text', `Hello, World!\nfoo/bar/fizz/buzz`);
//                 console.log(resp.text);
//             })
//         chai.request(server)
//             .get('/foo/bar/fizz/buzz/')
//             .end((err, resp) => {
//                 resp.should.have.status(200);
//                 resp.should.have.property('text', `Hello, World!\nfoo/bar/fizz/buzz`);
//                 console.log(resp.text);
//             })
//     })
// })

describe('server', () => {
    describe('router', () => {
        it('should handle request with 406 status code, if path match any routes', () => {
            let payloadObject = {
                'id': 1,
                'name': "payloadObject"
            };
            chai.request(server)
                .post('/sample')
                .send(payloadObject)
                .end((err, resp) => {
                    resp.should.have.status(401);
                    JSON.parse(resp.text).should.a('object');
                    JSON.parse((JSON.parse(resp.text).payload)).should.a('object');
                    JSON.parse((JSON.parse(resp.text).payload)).should.have.property('id', 1);
                    JSON.parse((JSON.parse(resp.text).payload)).should.have.property('name', 'payloadObject');
                })
            chai.request(server)
                .post('/fugazzi')
                .send(payloadObject)
                .end((err, resp) => {
                    resp.should.have.status(407);
                    JSON.parse(resp.text).should.a('object');
                    JSON.parse((JSON.parse(resp.text).payload)).should.a('object');
                    JSON.parse((JSON.parse(resp.text).payload)).should.have.property('id', 1);
                    JSON.parse((JSON.parse(resp.text).payload)).should.have.property('name', 'payloadObject');
                })
        })
        it('should handle request with 404 status code, if path does not match any routes', () => {
            let payloadObject = {
                'id': 1,
                'name': "payloadObject"
            };
            chai.request(server)
                .post('/sample1')
                .send(payloadObject)
                .end((err, resp) => {
                    resp.should.have.status(404);
                    JSON.parse(resp.text).should.a('object');
                    JSON.parse(resp.text).should.have.property('name', 'not found handler');
                })
            chai.request(server)
                .post('/fizz/buzz')
                .send(payloadObject)
                .end((err, resp) => {
                    resp.should.have.status(404);
                    JSON.parse(resp.text).should.a('object');
                    JSON.parse(resp.text).should.have.property('name', 'not found handler');
                })
            chai.request(server)
                .post('/foo/bar/')
                .send(payloadObject)
                .end((err, resp) => {
                    resp.should.have.status(404);
                    JSON.parse(resp.text).should.a('object');
                    JSON.parse(resp.text).should.have.property('name', 'not found handler');
                })
        })
    })
})
