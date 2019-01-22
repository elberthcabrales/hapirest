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
experiment('/mails/* routes', () => {
  const headers = {
    Authorization: 'Bearer ',
  };
  let lstemail = {};

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


  test('POST: /email', () => {
    const options = {
      method: 'POST',
      url: '/email',
      headers: headers,
      payload: {
        email: 'mail' + Math.random(1).toString().substring(5)+'@gmail.com',
      },
    };
    return new Promise((done) => {
      server.inject(options, (response) => {
        assert.equal(response.statusCode, 200);
        done();
      });
    });
  });

  test('GET: /email', () => {
    const options = {
      method: 'GET',
      url: '/email',
      headers: headers,
    };
    return new Promise((done) => {
      server.inject(options, (response) => {
        const ee = response.result;
        lstemail = ee[ee.length - 1];
        assert.equal(response.statusCode, 200);
        done();
      });
    });
  });

  //test for update user
  test('PUT: /email', () => {
    const options = {
      method: 'PUT',
      url: '/email',
      headers: headers,
      payload: {
        email: 'editado' + Math.random(1).toString().substring(5)+'@gmail.com',
        id: lstemail.id
      },
    };
    return new Promise((done) => {
      server.inject(options, (response) => {
        assert.equal(response.statusCode, 200);
        done();
      });
    });
  });

 /**
  * contactos
  * aqui simularemos que una persona envia un email y registraremos su correo en su tabla
  */
  test('POST: /contact', () => {
    const options = {
      method: 'POST',
      url: '/contact',
      headers: headers,
      payload: {
        email:"contacto"+Math.random(0)+"@gmail.com",
        tel:'3231304438',
        subject:'subject test',
        content:'content test'
      },
    };
    return new Promise((done) => {
      server.inject(options, (response) => {
        assert.equal(response.statusCode, 200);
        done();
      });
    });
  });
/**
 * Newsletter
 * a las personas que meten su newsletter les vamos a enviar noticias relevantes porque son susbscriptores
*/
test('POST: /newsletter', () => {
  const options = {
    method: 'POST',
    url: '/newsletter',
    payload: {
      email:'elberth'+Math.random(0)+'@gmail.com',
    },
  };
  return new Promise((done) => {
    server.inject(options, (response) => {
      assert.equal(response.statusCode, 200);
      done();
    });
  });
});

  after(() => {
    const options = {
      method: 'DELETE',
      url: '/email/'+lstemail.id,
      headers: headers
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