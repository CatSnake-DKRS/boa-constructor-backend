const request = require('supertest');

const server = 'http://localhost:3000';

describe('Route integration', () => {
  describe('/banana', () => {
    describe('GET', () => {
      it('responds with 400 status when nonexistent endpoint is requested', () => request(server)
        .post('/banana')
        .expect(404));
    });
  });
  describe('/banana', () => {
    describe('GET', () => {
      it('responds with 400 status when nonexistent endpoint is requested', () => request(server)
        .post('/banana')
        .expect(404));
    });
  });
});
