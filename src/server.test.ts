import supertest from "supertest";

import app from "./app";

const request = supertest(app);

test("GET /", async () => {
  const response = await request
    .get("/")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  expect(response.body).toEqual([
    {name: "league of legends", releaseYear: 2009},
    {name: "monster hunter world", releaseYear: 2018},
  ]);
});
