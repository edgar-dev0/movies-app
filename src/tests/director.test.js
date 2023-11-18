const request = require('supertest');
const app = require('../app');

let id;

test('GET /directors should get all directors records', async () => {
  const res = await request(app).get('/directors');
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test('POST /directors should create an director record', async () => {
  const director = {
    firstName: "Anthony",
    lastName: "Ruso",
    nationality: "Canadian",
    image: "https://t2.gstatic.com/licensed-image?q=tbn:ANd9GcSY2enbpjjnsFV4MNZDsiXpA0bKVgRz8803RgQgPEEH_RgF6Wmy_DNkdSnJi2pZZpE-",
    birthday: "1970-02-03"
  };
  const res = await request(app).post('/directors').send(director);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.firstName).toBe(director.firstName);
});

test('PUT /directors/:id should update an director record by id', async () => {
  const director = {
    firstName: "Joe",
    lastName: "Ruso",
    nationality: "Amercican",
    image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTde3DZUOBud5YzJOP_mC1eHRs6cAqi4TekW9HBnydb3NwTCd0F",
    birthday: "1971-07-18"
  };
  const res = await request(app).put(`/directors/${id}`).send(director);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(director.firstName);
});

test('DELETE /directors/:id should delete an director record by id', async () => {
  const res = await request(app).delete(`/directors/${id}`);
  expect(res.status).toBe(204);
});