/** User class for FoodieFit */

const { ExpressError, NotFoundError, BadRequestError, UnauthorizedError }= require("../expressError");
const db = require("../db");
const { sqlForPartialUpdate } = require("../helpers/sql");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");

/** User of FoodFit */

class User {
    /** register new user -- returns 
     *  {username, first_name, last_name, email}
     */
    static async register({username, password, firstName, lastName, email}) {
        // Check if username and password provided, if not throw error
        if (!username || !password) {
            throw new ExpressError("Username and password required", 400);
        }

        // Check if username already exist, if it does, throw error
        const duplicateCheck = await db.query(
            `SELECT username
            FROM users
            WHERE username = $1`,
            [username]);

        if (duplicateCheck.rows[0]) {
            throw new BadRequestError(`Duplicate username: ${username}`);
        }

        // hash password
        let hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        // save to db
        const results = await db.query(
            `INSERT INTO users (username, password, first_name, last_name, email)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, username, first_name AS "firstName", last_name AS "lastName", email`,
            [username, hashedPassword, firstName, lastName, email]);
        /* console.log(`results is ${JSON.stringify(results.rows[0])}`); */
        return results.rows[0];
    }

    /** Authenticate: is this username/password valid? Returns boolean. */

    static async authenticate(username, password) {
        if(!username || !password) {
            throw new ExpressError("Username and password required", 400);
        }
        const results = await db.query(
            `SELECT username, password
            FROM users
            WHERE username = $1`, [username]);

        const user = results.rows[0];
        if(user) {
            const user_valid = await bcrypt.compare(password, user.password);
            return user_valid;
        }
        throw new UnauthorizedError("Invalid username/password");
    }

    /**All: basic info on all users:
     *  [{username, first_name, last_name, email},...]
     */

    static async all() {
        const results = await db.query(
            `SELECT username, first_name AS "firstName", last_name AS "lastName", email
            FROM users`);

            if (results.rows.length === 0) {
                throw new ExpressError("No users", 404)
            }
            return results.rows
    }

    /** Get: get user by username
     * 
     *  returns { username,
     *          firstName,
     *          lastName,
     *          email }
     */

    static async get(username) {
        const results = await db.query(
            `SELECT username, first_name AS "firstName", last_name AS "lastName", email
            FROM users
            WHERE username = $1`, [username]);

            if (!results.rows[0]) {
                throw new NotFoundError(`User not found: ${username}`)
            }
            return results.rows[0];
    }

    /** Update user data with `data`
     *  
     * This is a "partial update" --- it's fine if data doesn't contain 
     * all the fields; only changes the provided ones
     * 
     *  Data can include:
     *      { firstName, lastName, password, email }
     * 
     *  Returns { username, firstName, lastName}
     * 
     *  Throws NotFoundError if not found
     * 
     *  TODO: Add password validation on frontend
     * 
     */

    static async update(username, data) {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
        }

        const {setCols, values } = sqlForPartialUpdate(
            data,
            {
                firstName: "first_name",
                lastName: "last_name",
                email: "email",
            });
        const usernameVarIdx = "$" + (values.length + 1);

        const querySql = `UPDATE users
                         SET ${setCols}
                         WHERE username = ${usernameVarIdx}
                         RETURNING username,
                         first_name AS "firstName",
                         last_name AS "lastName",
                         email`;
        const result = await db.query(querySql, [...values, username]);
        const user = result.rows[0];

        if (!user) throw new NotFoundError(`User does not exist: ${username}`);

        delete user.password;
        return user;
    }

    /**
     * Delete given user from database; returns undefined
     * 
     */

    static async remove(username) {
        let result = await db.query(
            `DELETE 
            FROM users
            WHERE username = $1
            RETURNING username`,
            [username]);

        const user = result.rows[0];

        if (!user) throw new NotFoundError(`No user: ${username}`);
    }
}

module.exports = User;