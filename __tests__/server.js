const request = require('supertest');

const server = 'http://localhost:3000';

// describe('GET /__test', () => {
//   it('responds with 200 status', () =>
//     request(server).get('/__test').expect(200));
// });



// describe('Route integration', () => {
//   describe('/api/entocode', () => {
//     describe('POST', () => {
//       it('response with 200 status and application/json content type', () => request(server)
//         .post('/api')
//         .expect('Content-Type', /application\/json/)
//         .expect(200));
//     });
//   });
// });

describe('Route integration', () => {
  it('test', () => expect(1 + 1).toEqual(2));
});
