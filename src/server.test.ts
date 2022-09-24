import supertest from "supertest";
import app from "./app";

const request = supertest(app);

describe("GET /games", () => {
  test("Valid request", async () => {
    const games = [
      {
        id: 1,
        game: "league of legends",
        releaseYear: 2009,
        createdAt: "2022-09-18T16:39:10.492Z",
        updatedAt: "2022-09-18T16:39:18.352Z",
      },
      {
        id: 2,
        game: "monster hunter world",
        releaseYear: 2018,
        createdAt: "2022-09-18T16:40:02.913Z",
        updatedAt: "2022-09-18T16:39:44.199Z",
      },
    ];
    const response = await request
      .get("/games")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body).toEqual(games);
  });
});
