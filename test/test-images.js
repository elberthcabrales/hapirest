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

//path, title,tipoe['slide','resource'],description
experiment('/images/* routes', () => {
  const headers = {
    Authorization: 'Bearer ',
  };
  let lstimg = {};

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


  test('POST: /image', () => {
    const options = {
      method: 'POST',
      url: '/image',
      headers: headers,
      payload: {
        title: 'title' + Math.random(1).toString().substring(5),
        tipo: 'slide',
        description: 'description test'
      },
    };
    return new Promise((done) => {
      server.inject(options, (response) => {
        assert.equal(response.statusCode, 200);
        done();
      });
    });
  });

  test('GET: /image/{tipo}', () => {
    const options = {
      method: 'GET',
      url: '/image/slide',
      headers: headers,
    };
    return new Promise((done) => {
      server.inject(options, (response) => {
        const ee = response.result;
        lstimg = ee[ee.length - 1];
        assert.equal(response.statusCode, 200);
        done();
      });
    });
  });

  //test for update user
  test('PUT: /image', () => {
    const options = {
      method: 'PUT',
      url: '/image',
      headers: headers,
      payload: {
        title:'titulo nuevo',
        description:'row editado desde test',
        tipo:'resource',
        id: lstimg.id
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

 

 /*  after(() => {
    const options = {
      method: 'DELETE',
      url: '/image/'+lstimg.id,
      headers: headers
    };
    return new Promise((done) => {
      server.inject(options, (response) => {
        console.log(response.result)
        assert.equal(response.statusCode, 200);
        done();
      });
    });
  }); */
});