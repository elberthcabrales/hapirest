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


experiment('/user/* routes', () => {
  const headers = {
    Authorization: 'Bearer ',
  };
  let lstuser = {};

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

  test('GET: /user', () => {
    const options = {
      method: 'GET',
      url: '/user',
      headers: headers,
    };
    return new Promise((done) => {
      server.inject(options, (response) => {
        const ee = response.result;
        lstuser = ee[ee.length - 1];
        assert.equal(response.statusCode, 200);
        done();
      });
    });
  });

  test('POST: /user', () => {
    const options = {
      method: 'POST',
      url: '/user',
      headers: headers,
      payload: {
        email: 'email-' + Math.random(1).toString().substring(2) + '@gmail.com',
        password: 'cabrales',
        username: 'ramon'
      },
    };
    return new Promise((done) => {
      server.inject(options, (response) => {
        assert.equal(response.statusCode, 200);
        done();
      });
    });
  });
  //test for update user
  test('PUT: /user', () => {
    const options = {
      method: 'PUT',
      url: '/user',
      headers: headers,
      payload: {
        email: 'EDITADO-' + Math.random(1).toString().substring(2) + '@gmail.com',
        username: 'ramon',
        id: lstuser.id
      },
    };
    return new Promise((done) => {
      server.inject(options, (response) => {
        console.log(response.result)
        //assert.equal(Array.isArray(response.result), true);
        //assert.equal(response.statusCode, 200);
        done();
      });
    });
  });

  test('PUT: /user/changepw', () => {
    const options = {
      method: 'PUT',
      url: '/user/changepw',
      headers: headers,
      payload: {
        email: 'elberthcabrales@gmail.com',
        password: 'cabrales',
        oldPassword: 'cabrles',
      },
    };
    return new Promise((done) => {
      server.inject(options, (response) => {
        console.log(response.result)
        //assert.equal(Array.isArray(response.result), true);
        assert.equal(response.statusCode, 200);
        done();
      });
    });
  });

  after(() => {
    const options = {
      method: 'DELETE',
      url: '/user',
      headers: headers,
      payload: {
        id: lstuser.id
      },
    };
    return new Promise((done) => {
      server.inject(options, (response) => {
        console.log(response.result)
        assert.equal(response.statusCode, 200);
        done();
      });
    });
  });
});