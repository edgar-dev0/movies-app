const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
require('../models');

let id;

test('GET /movies should get all movies records', async () => {
  const res = await request(app).get('/movies');
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test('POST /movies should create an movie record', async () => {
  const movie = {
    name: "Iron Man",
    image: "https://i.redd.it/458kgwujke131.jpg",
    synopsis: "Tony Stark. Genius, billionaire, playboy, philanthropist. Son of legendary inventor and weapons contractor Howard Stark. When Tony Stark is assigned to give a weapons presentation to an Iraqi unit led by Lt. Col. James Rhodes, he's given a ride on enemy lines. That ride ends badly when Stark's Humvee that he's riding in is attacked by enemy combatants. He survives - barely - with a chest full of shrapnel and a car battery attached to his heart. In order to survive he comes up with a way to miniaturize the battery and figures out that the battery can power something else. Thus Iron Man is born. He uses the primitive device to escape from the cave in Iraq. Once back home, he then begins work on perfecting the Iron Man suit. But the man who was put in charge of Stark Industries has plans of his own to take over Tony's technology for other matters.",
    releaseYear: 2009
  };
  const res = await request(app).post('/movies').send(movie);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(movie.name);
});

test('PUT /movies/:id should update an movie record by id', async () => {
  const movie = {
    name: "Endgame",
    image: "https://lumiere-a.akamaihd.net/v1/images/image_1e5c5703.jpeg?region=0,0,540,810",
    synopsis: "Después de los eventos devastadores de Avengers: Infinity War, el universo está en ruinas debido a las acciones de Thanos, el Titán Loco. Con la ayuda de los aliados que quedaron, los Vengadores deberán reunirse una vez más para intentar detenerlo y restaurar el orden en el universo de una vez por todas.",
    releaseYear: 2019
  };
  const res = await request(app).put(`/movies/${id}`).send(movie);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(movie.name);
});

//test para relacion n:m
test('POST /movies/:id/actors should create a many-to-many relationship record between movies and actors', async () => {
  const actor = await Actor.create({
    firstName: "Emilio",
    lastName: "Treviño",
    nationality: "Mexican",
    image: "https://static.wikia.nocookie.net/doblaje/images/d/d3/Emilio_Trevi%C3%B1o.jpg/revision/latest/scale-to-width-down/1000?cb=20230602034457&path-prefix=es",
    birthday: "1999-08-13"
  });
  const res = await request(app)
    .post(`/movies/${id}/actors`)
    .send([actor.id]);
  await actor.destroy();
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});

//test para relacion n:m
test('POST /movies/:id/directors should create a many-to-many relationship record between movies and dirctors', async () => {
  const director = await Director.create({
    firstName: "Robert",
    lastName: "Persichetti Jr.",
    nationality: "American",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Bob_Persichetti_by_Gage_Skidmore.jpg/220px-Bob_Persichetti_by_Gage_Skidmore.jpg",
    birthday: "1973-01-17"
  });
  const res = await request(app)
    .post(`/movies/${id}/directors`)
    .send([director.id]);
  await director.destroy();
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});

//test para relacion n:m
test('POST /movies/:id/genres should create a many-to-many relationship record between movies and genres', async () => {
  const genre = await Genre.create({
    name: "Animation"
  });
  const res = await request(app)
    .post(`/movies/${id}/genres`)
    .send([genre.id]);
  await genre.destroy();
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});

//test para relacion 1:n
test('PUT /movies/:id', async() => {
  const prize = {
    name: "Oscar to the best animation movie"
  };
  const res = await request(app).put(`/movies/${id}`).send(prize);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(prize.name);
});

test('DELETE /movies/:id should delete an movie record by id', async () => {
  const res = await request(app).delete(`/movies/${id}`);
  expect(res.status).toBe(204);
});