const Joi = require('joi');
const Knex = require('../knex');
//just have
module.exports = [
  {
    method: 'GET',
    path: '/email',
    handler: async (request, reply) => {
      const emails = await Knex.select('id','email as title').from('emails');
      return reply(emails);
    },
  },
  {
    method: 'POST',
    path: '/email',
    config:{
      auth: 'token',
      validate: {
        payload: {
            email: Joi.string().email(),
        }
      }
    },
    handler: async (request, reply) => {
      const email = await Knex('emails').insert({email:request.payload.email});
      return reply(email);
    },
  },
  {
    method: 'DELETE',
    path: '/email/{id}',
    config:{
      auth: 'token',
      validate: {
        params: {
            id: Joi.number()
        }
      }
    },
    handler: async (request, reply) => {
      const id  = request.params.id;
      await Knex('emails').where({id:id}).del();
      return reply("etiqueta eliminada");
    },
  },
  {
    method: 'PUT',
    path: '/email',
    config:{
      auth: 'token',
      validate: {
        payload: {
            id: Joi.number(),
            email : Joi.string().email(),
        }
      }
    },
    handler: async (request, reply) => {
      const {email,id} = request.payload;
       await Knex('emails').where({id:id}).update({
          email:email
       });
      return reply("se actualizo correctamente "+email);
    },
  },
];
