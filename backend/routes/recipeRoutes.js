/**
 *  Routes for calling ChatGPT API
 * 
 */

const jsonschema = require("jsonschema");

const express = require('express');
const router = new express.Router();
const db = require("../db");
const Recipe = require("../models/recipeModel");
const { ensureLoggedIn } = require("../middleware/auth");
const recipeSchema = require("../schemas/recipeCreate.json");
const { ExpressError, BadRequestError } = require("../expressError");

/** GET /request - send a recipe request and add recipe to database. Logged in required
 * 
 *  => { recipe }
 * 
 *  Authorization required: login
 */

router.get('/create', ensureLoggedIn, async(req, res, next) => {
    try {
        const validator = jsonschema.validate(req.body, recipeSchema);
        /* console.log(`user_id is ${JSON.stringify(req.user)}`); */
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        /* let recipe = await ChatGPT.callChatGPT(req.body, req.user.user_id); */
        let recipe = await Recipe.add(req.body,req.user.user_id)
        return res.json({ recipe })
    } catch (e) {
        console.log("Add recipe route request has failed")
        return next(e);
    }
});

/** GET /:recipe_id - request a previously created recipe from database.
 * 
 *  => { recipe }
 * 
 *  Authorization required: login
 */

router.get('/:recipe_id', ensureLoggedIn, async(req, res, next) => {
    try {
        let recipe = await Recipe.get(req.params.recipe_id);
        return res.json({ recipe })
    } catch(e) {
        console.log("Get recipe route request has failed")
        return next(e);
    }
});

module.exports = router;