const Joi = require('joi');
const Knex = require('../knex');
//just have
module.exports = [
  {
    method: 'GET',
    path: '/newsletter',
    handler: async (request, reply) => {
      const newsletters = await Knex('newsletters').innerJoin('emails','emails.id','newsletters.emailId');
      return reply(newsletters);
    },
  },
  {
    method: 'POST',
    path: '/newsletter',
    config:{
      validate: {
        payload: {
            email: Joi.string().email()
        }
      }
    },
    handler: async (request, reply) => {
      const emailId = await Knex('emails').insert({email:request.payload.email});
      const newsletter = await Knex('newsletters').insert({emailId:emailId});
      return reply(newsletter);
    },
  }
];
