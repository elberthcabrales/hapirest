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
//pages
experiment('/pages/* routes', () => {
  const headers = {
    Authorization: 'Bearer ',
  };
  let lstpage = {};

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

  test('POST: /page', () => {
    const options = {
      method: 'POST',
      url: '/page',
      headers: headers,
      payload: {
        title: 'title' + Math.random(1).toString().substring(5),
        category: 'tecnica',
        description: 'description test',
        content:'contenido fake'
      },
    };
    return new Promise((done) => {
      server.inject(options, (response) => {
        assert.equal(response.statusCode, 200);
        done();
      });
    });
  });

  test('GET: /page', () => {
    const options = {
      method: 'GET',
      url: '/page',
    };
    return new Promise((done) => {
      server.inject(options, (response) => {
        const ee = response.result;
        lstpage = ee[ee.length - 1];
        assert.equal(response.statusCode, 200);
        done();
      });
    });
  });
  
/*   test('GET: /page', () => {
    const options = {
      method: 'GET',
      url: '/page',
    };
    return new Promise((done) => {
      server.inject(options, (response) => {
        const ee = response.result;
        lstpage = ee[ee.length - 1];
        assert.equal(response.statusCode, 200);
        done();
      });
    });
  }); */

  test('GET: /page/category/{category}', () => {
    const options = {
      method: 'GET',
      url: '/page/category/tecnica',
      headers: headers,
    };
    return new Promise((done) => {
      server.inject(options, (response) => {
        assert.equal(response.statusCode, 200);
        done();
      });
    });
  });

  test('GET: /page/{slug}', () => {
    const options = {
      method: 'GET',
      url: '/page/'+lstpage.slug
    };
    return new Promise((done) => {
      server.inject(options, (response) => {
        assert.equal(response.statusCode, 200);
        done();
      });
    });
  });

  test('PUT: /page', () => {
    const options = {
      method: 'PUT',
      url: '/page',
      headers: headers,
      payload: {
        title:'editado - ' + Math.random(1).toString().substring(5),
        description:'row editado desde test',
        category:'tecnica',
        id: lstpage.id,
        content:'contenido editado'
      },
    };
    return new Promise((done) => {
      server.inject(options, (response) => {
        assert.equal(response.statusCode, 200);
        done();
      });
    });
  });

 

/*   after(() => {
    const options = {
      method: 'DELETE',
      url: '/page/'+lstpage.id,
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