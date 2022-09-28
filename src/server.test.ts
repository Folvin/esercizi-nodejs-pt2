import supertest from "supertest";
import {prismaMock} from "./lib/prisma/client.mock";
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

    //@ts-ignore
    prismaMock.games.findMany.mockResolvedValue(games);

    const response = await request
      .get("/games")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body).toEqual(games);
  });
});

describe("GET /games/:id", () => {
  test("Valid id", async () => {
    const game = {
      id: 1,
      game: "league of legends",
      releaseYear: 2009,
      createdAt: "2022-09-18T16:39:10.492Z",
      updatedAt: "2022-09-18T16:39:18.352Z",
    };

    //@ts-ignore
    prismaMock.games.findUnique.mockResolvedValue(game);

    const response = await request
      .get("/games/1")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body).toEqual(game);
  });
  test("unexisting id", async () => {
    //@ts-ignore
    prismaMock.games.findUnique.mockResolvedValue(null);

    const response = await request
      .get("/games/1000")
      .expect(404)
      .expect("Content-Type", /text\/html/);

    expect(response.text).toContain("Cannot GET /games/1000");
  });

  test("invalid id (NaN)", async () => {
    const response = await request
      .get("/games/asdf")
      .expect(404)
      .expect("Content-Type", /text\/html/);

    expect(response.text).toContain("Cannot GET /games/asdf");
  });
});

describe("POST /games", () => {
  test("valid request", async () => {
    const game = {
      id: 3,
      game: "league of legends",
      releaseYear: 2009,
      createdAt: "2022-09-25T13:39:19.302Z",
      updatedAt: "2022-09-25T13:39:19.303Z",
    };

    //@ts-ignore
    prismaMock.games.create.mockResolvedValue(game);

    const response = await request
      .post("/games")
      .send({
        game: "league of legends",
        releaseYear: 2009,
      })
      .expect(201)
      .expect("Content-Type", /application\/json/);
    expect(response.body).toEqual(game);
  });

  test("invalid request (validation error)", async () => {
    const game = {
      releaseYear: 2009,
    };

    const response = await request
      .post("/games")
      .send(game)
      .expect(422)
      .expect("Content-Type", /application\/json/);
    expect(response.body).toEqual({
      errors: {
        body: expect.any(Array),
      },
    });
  });
});

describe("PUT /games/:id", () => {
  test("valid request", async () => {
    const game = {
      id: 3,
      game: "valorant",
      releaseYear: 2020,
      rating: 9,
      createdAt: "2022-09-25T13:39:19.302Z",
      updatedAt: "2022-09-25T13:39:19.303Z",
    };

    //@ts-ignore
    prismaMock.games.update.mockResolvedValue(game);

    const response = await request
      .put("/games/3")
      .send({
        game: "valorant",
        releaseYear: 2020,
        rating: 9,
      })
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body).toEqual(game);
  });

  test("invalid request", async () => {
    const game = {
      releaseYear: 2020,
    };

    const response = await request
      .put("/games/1000")
      .send(game)
      .expect(422)
      .expect("Content-Type", /application\/json/);
    expect(response.body).toEqual({
      errors: {
        body: expect.any(Array),
      },
    });
  });
  test("unexisting id", async () => {
    //@ts-ignore
    prismaMock.games.update.mockRejectedValue(new Error("Error"));

    const response = await request
      .put("/games/1000")
      .send({
        game: "valorant",
        releaseYear: 2020,
      })
      .expect(404)
      .expect("Content-Type", /text\/html/);

    expect(response.text).toContain("Cannot PUT /games/1000");
  });

  test("invalid id (NaN)", async () => {
    const response = await request
      .put("/games/asdf")
      .send({
        id: 3,
        game: "valorant",
        releaseYear: 2020,
        createdAt: "2022-09-25T13:39:19.302Z",
        updatedAt: "2022-09-25T13:39:19.303Z",
      })
      .expect(404)
      .expect("Content-Type", /text\/html/);

    expect(response.text).toContain("Cannot PUT /games/asdf");
  });
});
