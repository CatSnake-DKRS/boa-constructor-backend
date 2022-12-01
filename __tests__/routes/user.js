const request = require('supertest');

const server = 'http://localhost:3000';

const randomUser = `stephen${Math.floor(Math.random() * 100) + Math.floor(Math.random() * 100)}`;

describe('Database Query Validation', () => {
  describe('/user/new', () => {
    describe('POST', () => {
      it('responds with 200 status and text/html content type and string "user created"', () => request(server)
        .post('/user/new')
        .send({
          username: randomUser,
          password: 'apple'
        })
        .expect('Content-Type', /text\/html; charset=utf-8/)
        .expect(200)
        .then((res) => {
          expect(res.text).toEqual('user created');
        }));
    });
  });

  describe('/user/login', () => {
    describe('POST', () => {
      it('responds with 200 status and text/html content type and string of username', () => request(server)
        .post('/user/login')
        .send({
          username: 'robbie3',
          password: 'banana'
        })
        .expect('Content-Type', /application\/json; charset=utf-8/)
        .expect(200)
        .then((res) => {
          expect(res.text).toEqual('\"robbie3\"');
        }));
    });
  });

  describe('/user/getRequests', () => {
    describe('POST', () => {
      it('responds with an array of user query history', () => request(server)
        .post('/user/getRequests')
        .send({
          username: 'robbie3',
          password: 'banana'
        })
        .expect('Content-Type', /application\/json; charset=utf-8/)
        .expect(200)
        .then((res) => {
          expect(Array.isArray(res.body)).toEqual(true);
        }));
    });
  });

  describe('/user/saveRequest', () => {
    describe('POST', () => {
      it('responds "required body not provided" when user makes a query without correct body', () => request(server)
        .post('/user/saveRequest')
        .send({
          username: 'robbie3',
          password: 'banana'
        })
        .expect('Content-Type', /application\/json; charset=utf-8/)
        .expect(400)
        .then((res) => {
          expect((res.text)).toEqual('{\"err\":\"required body not provided\"}');
        }));
    });
    describe('POST', () => {
      it('responds "request saved" when user makes a query without correct body', () => request(server)
        .post('/user/saveRequest')
        .send({
          username: 'robbie3',
          password: 'banana',
          query: 'test',
          translation: 'test',
          test: true
        })
        .expect('Content-Type', /text\/html; charset=utf-8/)
        .expect(200)
        .then((res) => {
          expect((res.text)).toEqual('request saved');
        }));
    });
  });
});
