/**
 * auth.test.js
 * ------------
 * Unit tests for authentication middleware functions (authenticateJWT, ensureLoggedIn) in auth.js
 *
 * These tests cover:
 * - Verifying JWT authentication with and without valid tokens
 * - Ensuring proper authorization for logged-in users
 */

"use strict";

const jwt = require("jsonwebtoken");        
const { UnauthorizedError } = require("../expressError"); 
const { authenticateJWT, ensureLoggedIn } = require("./auth"); 
const { SECRET_KEY } = require("../config");

const testJwt = jwt.sign({ username: "test", user_id: 1 }, SECRET_KEY);
const badJwt = jwt.sign({ username: "test", user_id: 1 }, "wrong"); 


describe("authenticateJWT", function () {

  test("works: via header", function () { // Test successful authentication with valid JWT in header
    expect.assertions(2);
    const req = { headers: { authorization: `Bearer ${testJwt}` } }; // Mock request with valid JWT
    const res = {};                                // Mock response object
    const next = function (err) {
      expect(err).toBeFalsy();                      // Expect no errors
    };
    authenticateJWT(req, res, next);               // Call middleware function
    expect(req.user).toEqual({                     // Check if user data is attached to the request object
        iat: expect.any(Number),                   // "iat" (issued at) should be a number
        username: "test",
        user_id: 1
    });
  });

  test("works: no header", function () {           // Test when no JWT is provided in the header
    expect.assertions(2);
    const req = {user: {}};                         // Mock request with empty user object
    const res = {};
    const next = function (err) {
      expect(err).toBeFalsy();                     // Expect no errors
    };
    authenticateJWT(req, res, next);
    expect(req.user).toEqual({});                  // User object should remain empty
  });

  test("works: invalid token", function () {      // Test with invalid JWT
    expect.assertions(2);
    const req = { headers: { authorization: `Bearer ${badJwt}` }, user: {} }; // Mock request with bad JWT
    const res = {};
    const next = function (err) {
      expect(err).toBeFalsy();                      // Expect no errors
    };
    authenticateJWT(req, res, next);
    expect(req.user).toEqual({});                  // User object should remain empty
  });
});


describe("ensureLoggedIn", function () {

  test("works", function () {                       // Test if middleware passes with logged-in user
    expect.assertions(1);
    const req = { user: { username: "test", user_id: 1 } }; // Mock request with logged-in user
    const res = {};
    const next = function (err) {
      expect(err).toBeFalsy();                      // Expect no errors
    };
    ensureLoggedIn(req, res, next);
  });

  test("unauth if no login", function () {       // Test if UnauthorizedError is thrown for unauthenticated user
    expect.assertions(1);
    const req = {};                                 // Mock request with no user data
    const res = {};
    const next = function (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy(); // Expect an UnauthorizedError
    };
    ensureLoggedIn(req, res, next);
  });

});
