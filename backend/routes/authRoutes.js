/**
 * authRoutes.js
 * -------------
 * Defines routes for user authentication and registration. Includes:
 * 
 * *  /register: Handles new user registration (schema validation included).
 * *  /login: Authenticates existing users.
 *
 * On successful registration or login, generates and returns a JSON Web Token (JWT).
 *
 * Dependencies:
 * *  express: For creating Express routes.
 * *  jsonschema: For input validation against a JSON schema.
 * *  jwt: For JSON Web Token (JWT) generation.
 * *  User (from userModel.js): Interacts with the user data model. 
 * *  Error classes (from expressErrors.js): For error handling.
 * 
 * Security Note: User passwords are handled securely by the User model.
 */

const jsonschema = require("jsonschema");

const express = require("express");
const router = new express.Router();
const { ExpressError, BadRequestError }= require("../expressError");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const userRegisterSchema = require("../schemas/userRegister.json");
const User = require("../models/userModel");

/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, email} => {token}.
 *
 */

router.post(`/register`, async (req, res, next) => {
    try {
        // Check if request is valid, if not throw error
        const validator = jsonschema.validate(req.body, userRegisterSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        
        // token payload includes username and user_id property
        const { username, id } = await User.register(req.body)
        let token = jwt.sign({username, id}, SECRET_KEY);
        return res.status(201).json({token})
    } catch (e) {
        return next(e)
    }
});

/** POST /login - login: {username, password} => {token} **/

router.post(`/login`, async(req, res, next) => {
    try {
        let {username, password} = req.body;
        // check if user is valid, if so it will return the user_id
        const user_id = await User.authenticate(username, password);
        if (user_id) {
            let token = jwt.sign({username, id: user_id}, SECRET_KEY); // payload includes the username and user id for adding recipes
            return res.json({token});
        } else {
            throw new ExpressError("Invalid username/password", 401);
        }
    } catch(e) {
        return next(e);
    }
});

module.exports = router;