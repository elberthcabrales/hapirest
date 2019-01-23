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
foo@bar:~$  mv .env.example .env #add your token
foo@bar:~$ npm install
foo@bar:~$ cd database/
foo@bar:~$ knex migrate:latest
foo@bar:~$ knex seed:run
foo@bar:~$ cd ../ #goback
foo@bar:~$ npm run dev
Server running at: http://localhost:9000
```
Run the unit test
```console
foo@bar:~$ npm run test
```
if you are development rest api and ganna test
```console
foo@bar:~$ npm run dev:test
```
the gulp file it's watching for changes in
```javascript
const src = [
  './api',
  './test',
  './server.js',
];
```
to run test
