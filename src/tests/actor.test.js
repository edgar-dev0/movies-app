const request = require('supertest');
const app = require('../app');
const Movie = require('../models/Movie');

let id;

test('GET /actors should get all actors records', async () => {
  const res = await request(app).get('/actors');
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test('POST /actors should create an actor record', async () => {
  const actor = {
    firstName: "Ryan",
    lastName: "Raynolds",
    nationality: "Canadian",
    image: "https://is1-ssl.mzstatic.com/image/thumb/07yFqDbFT34mSaKKzBr2ng/1200x675mf.jpg",
    birthday: "2012-04-14"
  };
  const res = await request(app).post('/actors').send(actor);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.firstName).toBe(actor.firstName);
});

test('PUT /actors/:id should update an actor record by id', async () => {
  const actor = {
    firstName: "Robert",
    lastName: "Downey Jr",
    nationality: "Amercican",
    image: "https://m.media-amazon.com/images/I/51m6bQ0yyKL._AC_UF1000,1000_QL80_.jpg",
    birthday: "1965-04-04"
  };
  const res = await request(app).put(`/actors/${id}`).send(actor);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(actor.firstName);
});

test('DELETE /actors/:id should delete an actor record by id', async () => {
  const res = await request(app).delete(`/actors/${id}`);
  expect(res.status).toBe(204);
});