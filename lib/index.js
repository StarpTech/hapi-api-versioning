/*
https://developer.github.com/v3/media/
http://tools.ietf.org/html/rfc4288#section-3.2
Example: application/vnd.<company>[.version].param[+json]
*/

// Declare internals
var internals = {};

exports.register = function (server, options, next) {
  server.ext('onPreHandler', [
    function (request, reply) {

      var acceptHeader = request.headers.accept;
      var regex = new RegExp('^application\\/vnd\\.' + options.vendor + '\\.v(\\d+)');
      var match = ( acceptHeader ? acceptHeader.match(regex) : null );

      var apiVersion = options.defaultVersion;
      if (match !== null) {
        apiVersion = parseInt(match[1]);
      }

      request.pre.apiVersion = apiVersion;

      return reply.continue();
    }
  ]);
  next();
};

exports.register.attributes = {
    pkg: require('../package.json')
};
