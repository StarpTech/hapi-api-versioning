/*
https://developer.github.com/v3/media/
http://tools.ietf.org/html/rfc4288#section-3.2
Example: application/vnd.<company>[.version].param[+json]
*/

// Load libraries

const Joi = require('joi');

// Declare internals

const internals = {
    schema: Joi.object({
        vendor: Joi.string().required(),
        defaultVersion: Joi.number().positive().required()
    })
};


exports.register = function (server, options, next) {

    const regex = new RegExp(`^application\\/vnd\\.${options.vendor}\\.v(\\d+)`);
    options = Joi.attempt(options, internals.schema, 'Plugin options do not match schema');

    server.ext('onPreHandler', (request, reply) => {

        const acceptHeader = request.headers.accept;
        const match = acceptHeader ? acceptHeader.match(regex) : null;
        const apiVersion = match ? parseInt(match[1], 10) : options.defaultVersion;

        request.pre.apiVersion = apiVersion;

        return reply.continue();
    });

    return next();
};


exports.register.attributes = {
    pkg: require('../package.json')
};
