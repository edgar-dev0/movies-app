const request = require('supertest');
const app = require('../app');

let id;

test('GET /genres should get all genres records', async () => {
  const res = await request(app).get('/genres');
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test('POST /genres should create an genre record', async () => {
  const genre = {
    name: "Science Fiction"
  };
  const res = await request(app).post('/genres').send(genre);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(genre.name);
});

test('PUT /genres/:id should update an genre record by id', async () => {
  const genre = {
    name: "Fantasy"
  };
  const res = await request(app).put(`/genres/${id}`).send(genre);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(genre.name);
});

test('DELETE /genres/:id should delete an genre record by id', async () => {
  const res = await request(app).delete(`/genres/${id}`);
  expect(res.status).toBe(204);
});