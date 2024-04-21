"use strict";

const db = require("../db");
const User = require("../models/userModel");
const Recipe = require("../models/recipeModel");
/* const { createToken } = require("../helpers/tokens"); */
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

const user_ids = [];
const recipe_ids = [];
const tokens = {}

async function commonBeforeAll() {

  await db.query("DELETE FROM users");
  await db.query("DELETE FROM recipes");

  const u1 = await User.register({
    username: "u1",
    firstName: "U1F",
    lastName: "U1L",
    email: "user1@user.com",
    password: "password1",
  });
  const u2 = await User.register({
    username: "u2",
    firstName: "U2F",
    lastName: "U2L",
    email: "user2@user.com",
    password: "password2",
  });
  const u3 = await User.register({
    username: "u3",
    firstName: "U3F",
    lastName: "U3L",
    email: "user3@user.com",
    password: "password3",
  });

  /* const r1 = await Recipe.add({
    ingredient_1: "egg",
    ingredient_2: "rice",
  }, u1.id);

  const r2 = await Recipe.add({
    ingredient_1: "chicken",
    ingredient_2: "rice",
  }, u1.id);

  const r3 = await Recipe.add({
    ingredient_1: "beef",
    ingredient_2: "rice",
    ingredient_3: "onion",
  }, u2.id); */

  user_ids.push(u1.id);
  user_ids.push(u2.id);
  user_ids.push(u3.id);
  
  /* recipe_ids.push(r1.id);
  recipe_ids.push(r2.id);
  recipe_ids.push(r3.id); */

  const u1Token = jwt.sign({username: u1.username, id: u1.id}, SECRET_KEY);
  const u2Token = jwt.sign({username: u2.username, id: u2.id}, SECRET_KEY);
  const u3Token = jwt.sign({username: u3.username, id: u3.id}, SECRET_KEY);

  tokens["u1Token"] = u1Token;
  tokens["u2Token"] = u2Token;
  tokens["u3Token"] = u3Token;

}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}


module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  user_ids,
  recipe_ids,
  tokens,
};
