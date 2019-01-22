const knexHooks = require('knex-hooks');
const md5 = require('md5');

const knex = require( 'knex' )( {

    client: 'mysql',
    connection: {

        host: '172.17.0.2',
        user: 'root',
        password: 'secret',
        database: 'colegiosayan',
        charset: 'utf8',
    }

} );
// init knex-hooks on knex instance
knexHooks(knex);
knex.addHook('before', 'insert', 'users', (when, method, table, params) => {

    // use helper to extract insert data from query builder
    const data = knexHooks.helpers.getInsertData(params.query);
    //console.log(data)
    // check if it's single row or multi row insert
    const rows = Array.isArray(data) ? data : [data];
  
    // modify insert data for each row
    rows.forEach(row => {
      row.password = md5(row.password);
      row.created_at = new Date();
    });
  });

  knex.addHook('before', 'insert', 'emails', (when, method, table, params) => {

    // use helper to extract insert data from query builder
    const data = knexHooks.helpers.getInsertData(params.query);
    //console.log(data)
    // check if it's single row or multi row insert
    const rows = Array.isArray(data) ? data : [data];
    // modify insert data for each row
    rows.forEach(row => {
      row.created_at = new Date();
    });
  });
module.exports = knex