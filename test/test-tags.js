const assert = require('assert');
// lab set-up
const Lab = require('lab');
const lab = exports.lab = Lab.script();
// get our server(API)
const server = require('../server');

const {
  experiment,
  test,
  before,
  after
} = lab;

//just ha value 
experiment('/tag/* routes', () => {
  const headers = {
    Authorization: 'Bearer ',
  };
  let lsttag = {};

  before(() => {
    const options = {
      method: 'POST',
      url: '/auth',
      payload: {
        email: 'elberthcabrales@gmail.com',
        password: 'cabrales',
      },
    };
    return new Promise((done) => {
      server.inject(options, (response) => {
        //console.log(response.payload);
        headers.Authorization += response.result.token;
        done();
      });
    });
  });

  test('POST: /tag', () => {
    const options = {
      method: 'POST',
      url: '/tag',
      headers: headers,
      payload: {
        value: 'etiqueta x ' + Math.random(1).toString().substring(5),
      },
    };
    return new Promise((done) => {
      server.inject(options, (response) => {
        assert.equal(response.statusCode, 200);
        done();
      });
    });
  });

  test('GET: /tag', () => {
    const options = {
      method: 'GET',
      url: '/tag',
    };
    return new Promise((done) => {
      server.inject(options, (response) => {
        const ee = response.result;
        lsttag = ee[ee.length - 1];
        assert.equal(response.statusCode, 200);
        done();
      });
    });
  });


  //test for update user
  test('PUT: /tag', () => {
    const options = {
      method: 'PUT',
      url: '/tag',
      headers: headers,
      payload: {
        value:'nueva etiqueta',
        id: lsttag.id
      },
    };
    return new Promise((done) => {
      server.inject(options, (response) => {

        //assert.equal(Array.isArray(response.result), true);
        assert.equal(response.statusCode, 200);
        done();
      });
    });
  });

 /*   after(() => {
    const options = {
      method: 'DELETE',
      url: '/tag/'+lsttag.id,
      headers: headers
    };
    return new Promise((done) => {
      server.inject(options, (response) => {
        console.log(response.result)
        assert.equal(response.statusCode, 200);
        done();
      });
    });
  });  */
});