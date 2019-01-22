const Joi = require('joi');
const Knex = require('../knex');
//tipos de pagina 'tecnica','licenciatura','capacitacion','blog','diplomad','equipo','ofertas'
module.exports = [
  {
    method: 'POST',
    path: '/page',
    config: {
      auth: 'token',

    },
    handler: async (request, reply) => {
      const { title, category, description, content } = request.payload;
      //console.log( {title,category,description,content})
      //return reply(request.payload)
      const result = await Knex('pages').insert({
        title: title,
        category: category,
        description: description,
        content: content,
        author: 1,
        slug: title.toString().toLowerCase()
          .replace(/\s+/g, '-')           // Replace spaces with -
          .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
          .replace(/\-\-+/g, '-')         // Replace multiple - with single -
          .replace(/^-+/, '')             // Trim - from start of text
          .replace(/-+$/, ''),            // Trim - from end of text,
      })
      return reply({ id: result[0] });
    },
  },
  {
    method: 'GET',
    path: '/page',
    handler: async (request, reply) => {
      const pages = await Knex('pages');
      // console.log(pages);
      return reply(pages);
    },
  },
  {
    method: 'GET',
    path: '/page/category/{category}',
    config: {
      validate: {
        params: {
          category: Joi.string().valid(['tecnica', 'licenciatura', 'capacitacion', 'blog', 'diplomad', 'equipo', 'ofertas']).required()
        }
      }
    },
    handler: async (request, reply) => {
      const category = request.params.category;
      const pages = await Knex('pages').where({ category: category });
      return reply(pages);
    },
  },
  {
    method: 'GET',
    path: '/page/{slug}',
    config: {
      validate: {
        params: {
          slug: Joi.string().required()
        }
      }
    },
    handler: async (request, reply) => {
      const slug = request.params.slug;
      const page = await Knex('pages').where({ slug: slug })
      return reply(page);
    },
  },
  {
    method: 'DELETE',
    path: '/page/{id}',
    config: {
      auth: 'token',
      validate: {
        params: {
          id: Joi.number()
        }
      }
    },
    handler: async (request, reply) => {
      //const userId = request.auth.credentials.id;
      let result =  await Knex('pages').where('id',request.params.id).delete();
      const id = request.params.id;
      return reply(id);
    },
  },
  {
    method: 'PUT',
    path: '/page',
    config: {
      auth: 'token',
      validate: {
        payload: {
            id: Joi.number(),
            title: Joi.string().required(),
            description: Joi.string().required(),
            content: Joi.string().required(),
            category: Joi.string().valid(['tecnica','licenciatura','capacitacion','blog','diplomad','equipo','ofertas']).required()
        }
      }
    },
    handler: async (request, reply) => {
      const { title, category, description, content, id } = request.payload;
      console.log(request.payload)
      await Knex('pages').where({ id: id }).update({
        title: title,
        category: category,
        description: description,
        content: content,
        slug: title.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '')
          .replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, ''),
      })
      return reply("pagina editada correctamente!");
    },
  },
  /**relaciones entre pagina y etiquetas!-----------------------------------------------------*/
  {
    //add tag to the page
    method: 'POST',
    path: '/page/tag',
    config: {
      validate: {
        payload: {
          pageId: Joi.number().required(),
          tagId: Joi.number().required(),
        }
      }
    },
    handler: async (request, reply) => {
      const { pageId, tagId } = request.payload;
      await Knex('tag_page').insert({ pageId: pageId, tagId: tagId });
      return reply({ pageId, tagId });
    },
  },

  {//quitar tag de una pagina
    method: 'DELETE',
    path: '/page/{pageId}/tag/{tagId}',
    handler: async (request, reply) => {
      const { pageId, tagId } = request.params;
      await Knex('tag_page').where({ pageId: pageId, tagId: tagId }).del();
      return reply("se agrego bien la etiqueta");
    },
  },

  {//obtener todoas las paginas relacionadas a el puño d etiquetas que recibira
    method: 'GET',
    path: '/page/tag/{tagId}',
    handler: async (request, reply) => {
      const tagId = request.params.tagId;//falta filtar por tagId
      const pages = await Knex('pages').innerJoin('tag_page', 'pages.id', 'tag_page.pageId').where('tag_page.tagId', tagId)
      return reply(pages);
    },
  },

];




