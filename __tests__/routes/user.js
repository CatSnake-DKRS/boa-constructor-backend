const request = require('supertest');

const server = 'http://localhost:3000';

const randomUser = `stephen${Math.floor(Math.random() * 100) + Math.floor(Math.random() * 100)}`;
console.log(randomUser);
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
          username: randomUser,
          password: 'banana'
        })
        .expect('Content-Type', /application\/json; charset=utf-8/)
        .expect(200)
        .then((res) => {
          expect(res.text).toEqual('\"robbie\"');
        }));
    });
  });
});
