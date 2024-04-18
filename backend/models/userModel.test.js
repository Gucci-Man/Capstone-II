
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require("../expressError");

const db = require("../db");
const User = require("./userModel");
const {
    commonAfterAll,
    commonAfterEach,
    commonBeforeAll,
    commonBeforeEach,
    user_ids,
    recipe_ids,
    } = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("authenticate", function() {
    test("works", async function() {
        console.log(`user_ids is ${user_ids}`);
        console.log(`recipe_ids is ${recipe_ids}`);
    });
});

