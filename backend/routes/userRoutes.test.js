
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

  test("unauth for anon", async function () {
    const resp = await request(app)
      .get("/users");
    expect(resp.statusCode).toEqual(401);
  });
});

/************************************** GET /users/:username */

describe("GET /users/:username", function() {
  
  test("works for users", async function () {
    const u1Token = tokens["u1Token"];
    const resp = await request(app)
      .get("/users/u1")
      .set("Authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({
      user: {
        username: "u1",
        firstName: "U1F",
        lastName: "U1L",
        email: "user1@user.com",
      },
    });
  });

  test("unauth for wrong user", async function () {
    const u1Token = tokens["u1Token"];
    const resp = await request(app)
      .get(`/users/u3`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app)
      .get(`/users/u1`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth if user not found", async function () {
    const u1Token = tokens["u1Token"];
    const resp = await request(app)
      .get(`/users/nope`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(401);
  });

});

/************************************** PATCH /users/:username */

describe("PATCH /users/:username", () => {
  test("works for users", async function () {
    const u1Token = tokens["u1Token"];
    const resp = await request(app)
      .patch(`/users/u1`)
      .send({
        firstName: "New",
      })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({ 
      user: {
        username: "u1",
        firstName: "New",
        lastName: "U1L",
        email: "user1@user.com",
      },
    });
  });

  test("unauth for wrong user", async function () {
    const u1Token = tokens["u1Token"];
    const resp = await request(app)
      .patch(`/users/u3`)
      .send({
        lastName: "New",
      })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(401);
  })

  test("unauth for anon", async function () {
    const resp = await request(app)
        .patch(`/users/u1`)
        .send({
          firstName: "New",
        });
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth if no such user", async function () {
    const u1Token = tokens["u1Token"];
    const resp = await request(app)
        .patch(`/users/nope`)
        .send({
          firstName: "Nope",
        })
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("bad request if invalid data", async function () {
    const u1Token = tokens["u1Token"];
    const resp = await request(app)
        .patch(`/users/u1`)
        .send({
          firstName: 42,
        })
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("works: set new password", async function () {
    const u1Token = tokens["u1Token"];
    const resp = await request(app)
        .patch(`/users/u1`)
        .send({
          password: "new-password",
        })
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({
      user: {
        username: "u1",
        firstName: "U1F",
        lastName: "U1L",
        email: "user1@user.com",
      },
    });
    const isSuccessful = await User.authenticate("u1", "new-password");
    expect(isSuccessful).toBeTruthy();
  });

});

/************************************** DELETE /users/:username */

describe("DELETE /users/:username", function () {
  test("works for users", async function () {
    const u1Token = tokens["u1Token"];
    const resp = await request(app)
        .delete(`/users/u1`)
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({ deleted: "u1" });
  });

  test("unauth for wrong user", async function () {
    const u1Token = tokens["u1Token"];
    const resp = await request(app)
        .delete(`/users/u2`)
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app)
        .delete(`/users/u1`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth if user missing", async function () {
    const u1Token = tokens["u1Token"];
    const resp = await request(app)
        .delete(`/users/nope`)
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(401);
  });
});