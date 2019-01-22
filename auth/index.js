const jwt = require('jsonwebtoken');
const Joi = require('joi');
const md5 = require('md5');
const Knex = require('../knex');

exports.register = function (server, options, next) {
  server.route({
    config: {
      validate: {
        payload: {
          email: Joi.string().email().required(),
          password: Joi.string().required(),
        },
      },
    },
    method: 'POST',
    path: '/auth',
    handler: async (request, reply) => {
      const { email, password } = request.payload;
      const [user] = await Knex('users')
        .where({ email: email });
      console.log("  ip "+request.info.remoteAddress)  
      if (!user) {
        return reply({ message: 'user not found' }).code(404);
      }

      if (user.password == md5(password)) {
        const token = jwt.sign(
          {
            name: user.name,
            email: user.email,
            id: user.id,
          },
          options.secretkey,
          {
            algorithm: 'HS256',
            expiresIn: '120d',
          }
        );
        return reply({ token: token, uid: user.uid });
      }
      return reply({ message: 'incorrect password' }).code(400);
    }
  });

  next();
};

exports.register.attributes = {
  pkg: require('./package')
};
