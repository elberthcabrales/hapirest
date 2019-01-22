const Joi = require('joi');
const Knex = require('../knex');
const fs = require('fs');
//path, title,tipoe['slide','resource'],description
module.exports = [
  {
    method: 'GET',
    path: '/static/{param*}',
    handler: async (request, reply) => {
      const path = request.params.param;
      return reply.file(__dirname +"/../uploads/"+ path);
    },
  },
  {
    method: 'GET',
    path: '/image',
    handler: async (request, reply) => {
      const images = await Knex.select('*').from('images');
      return reply(images);
    },
  },
  {
    method: 'POST',
    path: '/image',
    config: {
      payload: {
        output: "stream",
        parse: true,
        allow: "multipart/form-data",
        maxBytes: 2 * 1000 * 1000
      }
      // auth: 'token',
    },
    handler: async (request, reply) => {
      const { title, inputfile, description, tipo} = request.payload; //pendiente fs add images
      const name = inputfile.hapi.filename;
      const path = Math.random().toString().substring(7)+"_"+name.split(' ').join('_');
      const file = fs.createWriteStream("uploads/" +path);
      file.on('error', (err) => console.error(err));

      inputfile.pipe(file);

      const inserted = await Knex('images').insert({title:title,path:path,tipo:tipo,description:description});
      
      return reply({id:inserted[0], title:title,path:path,tipo:tipo,description:description});
    },
  },
  {
    method: 'DELETE',
    path: '/image/{id}',
    config: {
      //auth: 'token',
      validate: {
        params: {
          id: Joi.number()
        }
      }
    },
    handler: async (request, reply) => {
      const id = request.params.id;
      const image = await Knex('images').where({ id: id }).first();
      fs.unlink(__dirname +"/../uploads/"+ image.path,(err)=>{
        if(err) throw err;
      })
      await Knex('images').where({ id: id }).del();
      return reply(id);
    },
  }
];
