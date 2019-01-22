'use strict';
require('dotenv').load();
const Hapi = require('hapi');
const good = require('good');
const hapiAuthJwt = require('hapi-auth-jwt')
const Inert = require('inert');
const Path = require('path');

const routes = {};
routes.images = require('./api/images');
routes.users = require('./api/users');
routes.pages = require('./api/pages');
routes.tags = require('./api/tags');
routes.emails = require('./api/emails');
routes.contacts = require('./api/contacts');
routes.newsletters = require('./api/newsletters');

// create a server with a host and port
const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: process.env.PORT || 8000,
  routes: {
    cors: {
      origin: ['http://localhost:3000']
    },
    files: {
      relativeTo: Path.join(__dirname, 'uploads')
    }
  }
});
/* var validate = function (request, decodedToken, callback) {
  var error = {};
  //aqui va la logica del componente
  console.log(decodedToken);
  return callback(error, true, "credentials")
}; */
// valida con hapi-auth-jwt
server.register(hapiAuthJwt, (err) => {
  server.auth.strategy('token', 'jwt', {
    key: process.env.KEY,
    // validateFunc: validate,
    verifyOptions: {
      algorithms: ['HS256'],
    },
  });
  server.route(routes.pages);
  server.route(routes.images);
  server.route(routes.users);
  server.route(routes.tags);
  server.route(routes.emails);
  server.route(routes.contacts);
  server.route(routes.newsletters);
});


server.register([
  {
    register: good,
    options: {
      ops: {
        interval: 100000,
      },
      reporters: {
        consoleReporters: [
          { module: 'good-console' },
          'stdout',
        ],
      }
    }
  },
  { register:Inert },
  { register: require('./auth/index'), options: { secretkey: process.env.KEY } },
], (err) => {
  if (err) return console.error(err);

  // Start the server
  server.start((err) => {
    if (err) throw err;
    console.log(`Server running at: ${server.info.uri}`);
  });
});

module.exports = server;
/**
 * agregar .env-
 * crear migraciones knexjs-
 * crear modelos-
 * insertar datos-
 * registrar el modulo-
 * crear api/v1/ con metodo get para traerme los datos
 * agregar jwt
 * escribir pruebas
 */

/**
* cuando comunicas plugins usan
* parametro options y eventos para pasar parametros
*  register: requiere(databasemodule),
           "options": {
               dbName: "pingoo",
               dbTable: "pings"
           }
**/