const request = require('supertest');

const server = 'http://localhost:3000';

describe('Route integration', () => {
  describe('/api/entocode', () => {
    describe('POST', () => {
      it('responds with 200 status and application/json content type', () => request(server)
        .post('/api/entocode')
        .send({
          username: 'robbie',
          query: 'a function that console logs "abc"'
        })
        .expect('Content-Type', /application\/json; charset=utf-8/)
        .expect(200));
      it('responds with object with keys "query" and "translation"', () => request(server)
        .post('/api/entocode')
        .send({
          username: 'robbie',
          query: 'a function that console logs "abc"'
        })
        .expect(200)
        .then((res) => {
          const hasTranslation = Object.hasOwn(res.body, 'translation');
          const hasQuery = Object.hasOwn(res.body, 'query');
          expect(hasTranslation).toEqual(true);
          expect(hasQuery).toEqual(true);
        }));
    });
  });

  describe('/api/codetoen', () => {
    describe('POST', () => {
      it('responds with 200 status and application/json content type', () => request(server)
        .post('/api/codetoen')
        .send({
          username: 'robbie',
          query: 'console.log("hi")'
        })
        .expect('Content-Type', /application\/json; charset=utf-8/)
        .expect(200));
      it('responds with object with keys "query" and "translation"', () => request(server)
        .post('/api/codetoen')
        .send({
          username: 'robbie',
          query: 'console.log("hi")'
        })
        .expect(200)
        .then((res) => {
          const hasTranslation = Object.hasOwn(res.body, 'translation');
          const hasQuery = Object.hasOwn(res.body, 'query');
          expect(hasTranslation).toEqual(true);
          expect(hasQuery).toEqual(true);
        }));
    });
  });

  describe('/api/entosql', () => {
    describe('POST', () => {
      it('responds with 200 status and application/json content type', () => request(server)
        .post('/api/entosql')
        .send({
          username: 'robbie',
          schema: { Entertainer: 'id, name, salary' },
          query: 'a function that console logs "abc"'
        })
        .expect('Content-Type', /application\/json; charset=utf-8/)
        .expect(200));
      it('responds with object with keys "query", "translation", and "schema"', () => request(server)
        .post('/api/entosql')
        .send({
          username: 'robbie',
          schema: { Entertainer: 'id, name, salary' },
          query: 'a function that console logs "abc"'
        })
        .expect(200)
        .then((res) => {
          const hasTranslation = Object.hasOwn(res.body, 'translation');
          const hasQuery = Object.hasOwn(res.body, 'query');
          const hasSchema = Object.hasOwn(res.body, 'schema');
          expect(hasTranslation).toEqual(true);
          expect(hasQuery).toEqual(true);
          expect(hasSchema).toEqual(true);
        }));
    });
  });
});
