const Joi = require('joi');
const Knex = require('../knex');
//just have
module.exports = [
  {
    method: 'GET',
    path: '/contact',
    handler: async (request, reply) => {
      const contacts = await Knex.select(
        'contacts.id','emails.email as title','contacts.emailId'
        ).from('contacts')
        .innerJoin('emails','emails.id','contacts.emailId').groupBy('contacts.emailId');
      return reply(contacts);
    },
  },
  {
    method: 'GET',
    path: '/contact/{id}',
    config:{
      validate: {
        params: {
            id: Joi.number()
        }
      }
    },
    handler: async (request, reply) => {
      const id = request.params.id;
      console.log(id)
      const contacts = await Knex('contacts').where('emailId',id);
      return reply(contacts);
    },
  },
  {
    method: 'POST',
    path: '/contact',
    config:{
      validate: {
        payload: {
            tel: Joi.string(),
            subject: Joi.string().required(),
            content: Joi.string().required(),
            email: Joi.string().email()
        }
      }
    }, //primero debe buscar si existe el correo despues y si no existe lo va a insertar
    handler: async (request, reply) => {
      const {tel,subject,content,email} = request.payload;
    
      Knex('emails').select().where('email',email).first().then(function(row){
        if(row){
          Knex('contacts').insert({tel:tel,subject:subject,content:content,emailId:row.id}).then(res => {
            return reply(res)
          })
        }else{
          Knex('emails').insert({email:email}).then(result => {
            const emailId = result;
            Knex('contacts').insert({tel:tel,subject:subject,content:content,emailId:emailId}).then(res => {
              return reply(res)
            })
          })
        }
      });   
    },
  },
  {
    method: 'DELETE',
    path: '/contact/{id}',
    config:{
     // auth: 'token',
      validate: {
        params: {
            id: Joi.number()
        }
      }
    },
    handler: async (request, reply) => {
      const id  = request.params.id;
      await Knex('contacts').where({emailId:id}).del();
      return reply("etiqueta eliminada");
    },
  }
];
