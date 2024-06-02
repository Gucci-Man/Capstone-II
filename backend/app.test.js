/**
 * app.test.js
 * -----------
 * Integration tests for the main Express application (`app.js`).
 * These tests focus on the server's response to 404 errors for non-existent routes.
 *
 * Tests include:
 * - Basic 404 handling in production environment
 * - 404 handling with stack trace printing in non-production environments 
 */

const request = require("supertest"); 
const app = require("./app"); 
const db = require("./db"); 


/**
 * Test 1:
 * Check if a request to an invalid path returns a 404 status code. 
 * This assumes the app has a middleware for handling 404 errors
 * */
test("not found for site 404", async function () {
  const resp = await request(app).get("/no-such-path"); // Make a request to an invalid path
  expect(resp.statusCode).toEqual(404); // Verify the status code is 404 (Not Found)
});

/**
 * Test 2:
 * Simulates a non-production environment by clearing the NODE_ENV variable. 
 * Repeats the previous test to ensure a 404 is still returned, potentially with 
 * additional details in the response (like a stack trace for debugging).
 */
test("not found for site 404 (test stack print)", async function () {
  process.env.NODE_ENV = ""; // Simulate a non-production environment
  const resp = await request(app).get("/no-such-path");
  expect(resp.statusCode).toEqual(404);
  delete process.env.NODE_ENV; // Restore NODE_ENV after the test
});

/**
 *  This is a Jest hook that runs after all tests in the file have finished.
 *  It closes the database connection to ensure a clean state for other test runs.
 */
afterAll(function () {
  db.end();
});
