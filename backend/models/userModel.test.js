
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
        const user = await User.authenticate("u1", "password1");
        expect(user).toEqual(true);
    });

    test("unauth if no such user", async function() {
        try {
            await User.authenticate("nope", "password");
            fail();
        } catch (err) {
            expect(err instanceof UnauthorizedError).toBeTruthy();
        }
    });
});

/************************************** register */

