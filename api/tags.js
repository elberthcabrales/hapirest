const Joi = require('joi');
const Knex = require('../knex');
//just have
module.exports = [
  {
    method: 'GET',
    path: '/tag',
    handler: async (request, reply) => {
      const tags = await Knex.select('id','value as title').from('tags');
      return reply(tags);
    },
  },
  {
    method: 'POST',
    path: '/tag',
    config:{
      //auth: 'token',
      validate: {
        payload: {
            value: Joi.string().required(),
        }
      }
    },
    handler: async (request, reply) => {
      const tag = await Knex('tags').insert({value:request.payload.value});
      return reply(tag[0]);
    },
  },
  {
    method: 'DELETE',
    path: '/tag/{id}',
    config:{
      //auth: 'token',
      validate: {
        params: {
            id: Joi.number()
        }
      }
    },
    handler: async (request, reply) => {
      const id  = request.params.id;
      await Knex('tags').where({id:id}).del();
      return reply("etiqueta eliminada");
    },
  },
  {
    method: 'PUT',
    path: '/tag',
    config:{
      //auth: 'token',
      validate: {
        payload: {
            id: Joi.number(),
            value : Joi.string().required(),
        }
      }
    },
    handler: async (request, reply) => {
      const {value,id} = request.payload;
       const tag = await Knex('tags').where({id:id}).update({
         value:value
       });
      return reply("se actualizo correctamente");
    },
  },
    {//obtener todoas las etiquetas de la pagina
      method: 'GET', 
      path: '/tag/page/{pageId}',
      handler: async (request, reply) => {
        const pageId  = request.params.pageId;
        const pages = await Knex('tags').innerJoin('tag_page','tags.id','tag_page.tagId').where('tag_page.pageId',pageId)
        return reply(pages);
      },
    },
];
