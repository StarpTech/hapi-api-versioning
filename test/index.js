// Load modules

const Code = require('code');
const Hapi = require('hapi');
const Lab = require('lab');


// Declare internals

const internals = {
    plugin: {
        register: require('../'),
        options: {
            defaultVersion: 1,
            vendor: 'github'
        }
    }
};


// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;


describe('Scarecrow', () => {

    it('request with a specific api version', (done) => {

        const server = new Hapi.Server();
        server.connection();

        server.register(internals.plugin, (err) => {

            // Add test route

            server.route({
                path: '/apiVersion',
                method: 'GET',
                handler: (request, reply) => {
                    expect(request.pre.apiVersion).to.equal(2);
                    return reply();
                }
            });

            const req = {
                method: 'GET',
                url: 'http://example.com/apiVersion',
                headers: {
                    accept: 'application/vnd.github.v2+json'
                }
            };

            server.inject(req, (res) => {

                return done();
            });
        });
    });

    it('Request with an invalid api version should fallback to default version', (done) => {

        const server = new Hapi.Server();
        server.connection();

        server.register(internals.plugin, (err) => {

            // Add test route

            server.route({
                path: '/apiVersion',
                method: 'GET',
                handler: (request, reply) => {

                    expect(request.pre.apiVersion).to.equal(1);
                    return reply();
                }
            });

            const req = {
                method: 'GET',
                url: 'http://example.com/apiVersion',
                headers: {
                    accept: 'application/vnd.github.vA+json'
                }
            };

            server.inject(req, (res) => {

                done();
            });
        });
    });

    it('None accept header should fallback to default version', (done) => {

        const server = new Hapi.Server();
        server.connection();

        server.register(internals.plugin, (err) => {

            // Add test route

            server.route({
                path: '/apiVersion',
                method: 'GET',
                handler: (request, reply) => {

                    expect(request.pre.apiVersion).to.equal(1);
                    return reply();
                }
            });

            const req = {
                method: 'GET',
                url: 'http://example.com/apiVersion',
                headers: {}
            };

            server.inject(req, (res) => {

                return done();
            });
        });
    });

    it('request with a specific two or more digit api version', (done) => {

        const server = new Hapi.Server();
        server.connection();

        server.register(internals.plugin, (err) => {

            // Add test route

            server.route({
                path: '/apiVersion',
                method: 'GET',
                handler: (request, reply) => {

                    expect(request.pre.apiVersion).to.equal(321);
                    return reply();
                }
            });

            const req = {
                method: 'GET',
                url: 'http://example.com/apiVersion',
                headers: {
                    accept: 'application/vnd.github.v321+json'
                }
            };

            server.inject(req, (res) => {

                return done();
            });
        });
    });
});
