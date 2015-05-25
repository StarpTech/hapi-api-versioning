// Load modules

var Code = require('code');
var Hapi = require('hapi');
var Lab = require('lab');


// Declare internals

var internals = {};


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;


describe('Scarecrow', function () {

    it('request with a specific api version', function (done) {

        var server = new Hapi.Server();
        server.connection();

        var plugin = {
          register: require('../'),
          options: {
            defaultVersion: 1,
            vendor: 'github'
          }
        };

        server.register(plugin, function (err) {

            // Add test route

            server.route({
              path: '/apiVersion',
              method: 'GET',
              handler: function (request, reply) {
                expect(request.pre.apiVersion).to.equal(2);
                return reply();
              }
            });

            var req = {
                method: 'GET',
                url: 'http://example.com/apiVersion',
                headers: {
                    accept: 'application/vnd.github.v2+json'
                }
            };

            server.inject(req, function (res) {
                done();
            });
        });
    });

    it('Request with an invalid api version should fallback to default version', function (done) {

        var server = new Hapi.Server();
        server.connection();

        var plugin = {
          register: require('../'),
          options: {
            defaultVersion: 1,
            vendor: 'github'
          }
        };

        server.register(plugin, function (err) {

          // Add test route

          server.route({
            path: '/apiVersion',
            method: 'GET',
            handler: function (request, reply) {
              expect(request.pre.apiVersion).to.equal(1);
              return reply();
            }
          });

            var req = {
                method: 'GET',
                url: 'http://example.com/apiVersion',
                headers: {
                    accept: 'application/vnd.github.vA+json'
                }
            };

            server.inject(req, function (res) {
                done();
            });
        });
    });

    it('None accept header should fallback to default version', function (done) {

        var server = new Hapi.Server();
        server.connection();

        var plugin = {
          register: require('../'),
          options: {
            defaultVersion: 1,
            vendor: 'github'
          }
        };

        server.register(plugin, function (err) {

          // Add test route

          server.route({
            path: '/apiVersion',
            method: 'GET',
            handler: function (request, reply) {
              expect(request.pre.apiVersion).to.equal(1);
              return reply();
            }
          });

            var req = {
                method: 'GET',
                url: 'http://example.com/apiVersion',
                headers: {}
            };

            server.inject(req, function (res) {
                done();
            });
        });
    });

    it('request with a specific two or more digit api version', function (done) {

        var server = new Hapi.Server();
        server.connection();

        var plugin = {
          register: require('../'),
          options: {
            defaultVersion: 1,
            vendor: 'github'
          }
        };

        server.register(plugin, function (err) {

          // Add test route

          server.route({
            path: '/apiVersion',
            method: 'GET',
            handler: function (request, reply) {
              expect(request.pre.apiVersion).to.equal(321);
              return reply();
            }
          });

            var req = {
                method: 'GET',
                url: 'http://example.com/apiVersion',
                headers: {
                    accept: 'application/vnd.github.v321+json'
                }
            };

            server.inject(req, function (res) {
                done();
            });
        });
    });
});
