
const bcrypt = require("bcrypt");
const db = require("../db");
const { BCRYPT_WORK_FACTOR } = require("../config");

const user_ids = [];
const recipe_ids = [];

async function commonBeforeAll() {
    await db.query("DELETE FROM recipes");
    await db.query("DELETE FROM users");

    const resultsUsers = await db.query(`
        INSERT INTO users(username,
                            password,
                            first_name,
                            last_name,
                            email)
        VALUES  ('u1', $1, 'U1F', 'U1L', 'u1@email.com'),
                ('u2', $2, 'U2F', 'U2L', 'u2@email.com'),
                ('u3', $3, 'U3F', 'U3L',  'u3@email.com')
        RETURNING user_id`,
        [
            await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
            await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
            await bcrypt.hash("password3", BCRYPT_WORK_FACTOR),
        ]);
    user_ids.splice(0,0,...resultsUsers.rows.map(u => u.user_id));

    const resultsRecipes = await db.query(`
        INSERT INTO recipes(title,
                            total_time,
                            instructions,
                            creator_id)
        VALUES ('r1', '1 hr', 'steps_1', $1),
               ('r2', '2 hr', 'steps_2', $2),
               ('r3', '3 hr', 'steps_3', $3),
               ('r4', '4 hr', 'steps_4', $4)
        RETURNING recipe_id`,
        [
            user_ids[0],
            user_ids[1],
            user_ids[2],
            user_ids[2],
        ]);
    recipe_ids.splice(0, 0,...resultsRecipes.rows.map(r => r.recipe_id));
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
};
