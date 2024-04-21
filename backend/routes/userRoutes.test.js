
const request = require("supertest");

const db = require("../db");
const app = require("../app");
const User = require("../models/userModel");

const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    user_ids,
    recipe_ids, 
    tokens,
  } = require("./_testCommon");

  beforeAll(commonBeforeAll);
  beforeEach(commonBeforeEach);
  afterEach(commonAfterEach);
  afterAll(commonAfterAll);

  /************************************** GET /users */

describe("GET /users", function () {
  test("works for users", async function () {
    const u1Token = tokens["u1Token"];
    const resp = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({
      users: [
        {
          username: "u1",
          firstName: "U1F",
          lastName: "U1L",
          email:"user1@user.com",
        },
        {
          username: "u2",
          firstName: "U2F",
          lastName: "U2L",
          email:"user2@user.com",
        },
        {
          username: "u3",
          firstName: "U3F",
          lastName: "U3L",
          email:"user3@user.com",
        }
      ],
    });
  });

});