const md5 = require('md5');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          email: 'elberthcabrales@gmail.com',  
          username: 'elberth', 
          password: md5('cabrales')
        },
        {
          id: 2,
          email: 'otro@gmail.com',  
          username: 'toupdate', 
          password: md5('cabrales')
        },
      ]);
    });
};
