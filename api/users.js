const Joi = require('joi');
const Knex = require('../knex');
const md5 = require('md5');

//path, title,tipoe['slide','resource'],description
module.exports = [
  {
    method: 'GET',
    path: '/user',
    config: {
      auth: 'token'
    },
    handler: async (request, reply) => {
      const users = await Knex('users').select(['id','username','email','password']);
      return reply(users);
    },
   },
   {
    method: 'POST',
    path: '/user',
    config:{
      auth: 'token',
      validate: {
        payload: {
            username: Joi.string().required(),
            email: Joi.string().email(),
            password: Joi.string().required()
        }
      }
    },
    handler: async (request, reply) => {
      // vamos a validar que el usario que puede crear usarios sea elberthcarales@gmail
      const { username, email,password } = request.payload;
      if(request.auth.credentials.email!=='elberthcabrales@gmail.com') return reply({ message: 'No eres el admin' }).code(401);
      const user = await Knex('users').insert({username:username,email:email,password:password});
      return reply(request.payload);
    },
  },
  {
    method: 'PUT',
    path: '/user',
    config:{
      auth: 'token',
      validate: {
        payload: {
            username: Joi.string().required(),
            email: Joi.string().email(),
            id:Joi.number().required()
        }
      }
    },
    handler: async (request, reply) => {
      
      const { username, email,id} = request.payload;
      const credentials = request.auth.credentials;
      if(credentials.id!==id && credentials.email!=="elberthcabrales@gmail.com") return reply({ message: 'Basta este usario no eres tu!' }).code(401);
      const user = await Knex('users').where({id:id}).update({
        username:username,
        email:email
      });
      return reply(user);
    },
  },
  {
    method: 'DELETE',
    path: '/user',
    config:{
      auth: 'token',
      validate: {
        payload: {
            id: Joi.number().required(),
        }
      }
    },
    handler: async (request, reply) => {
      //const userId = request.auth.credentials.id;
      if(request.auth.credentials.email!=='elberthcabrales@gmail.com') return reply({ message: 'No eres el admin' }).code(401);
      const id  = request.payload.id;
      await Knex('users').where({id:id}).del();
      return reply("Borrado ok!");
    },
  },
 
  {
    method: 'PUT',
    path: '/user/changepw',
    config:{
      auth: 'token',
      validate: {
        payload: {
            email: Joi.string().email(),
            password: Joi.string().required(),
            oldPassword: Joi.string().required(),
        }
      }
    },
    handler: async (request, reply) => {
      const { email, password,oldPassword} = request.payload;
      const newpassword = md5(password);
      const passwordmd5 = md5(oldPassword);
      //console.log(passwordmd5);
      await Knex('users').where({email:email,password:passwordmd5}).update({
        password:newpassword
      });
     
      return reply("cambiado correctamente "+email);
    },
  },

];
