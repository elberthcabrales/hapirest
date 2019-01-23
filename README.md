# hapirest
hapi rest for nuxtjs
 npm v8.12.0
 
 edit knexfile.js or add with cofing .env vars
```javascript
  module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: '172.17.0.1',
      user: 'root',
      password: 'secret',
      database: 'dbname',
      charset: 'utf8',
    }
  }
};

```
sorry! i added too in knex.js :'/
```javascript
//this file is just to hook created event
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

```
config with your console
```console
foo@bar:~$ npm install
foo@bar:~$ cd database/
foo@bar:~$ knex migrate:latest
foo@bar:~$ knex seed:run
foo@bar:~$ cd ../ #goback
foo@bar:~$ npm run dev
```
