/**
 *  Routes for calling ChatGPT API
 * 
 */

const jsonschema = require("jsonschema");

const express = require('express');
const router = new express.Router();
const db = require("../db");
const Recipe = require("../models/recipeModel");
const { ensureLoggedIn, ensureCorrectUser } = require("../middleware/auth");
const recipeSchema = require("../schemas/recipeCreate.json");
const { ExpressError, BadRequestError } = require("../expressError");

/** GET /request - send a recipe request and add recipe to database. Logged in required
 * 
 *  => { recipe }
 * 
 *  Authorization required: login
 */

router.post('/create', ensureLoggedIn, async(req, res, next) => {
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

/** GET /:username - request all recipes associated with user only
 *  
 *  => { recipes }
 * 
 *  Authorization required: login
 */

router.get("/:username", ensureCorrectUser, async(req, res, next) => {
    try {
        let recipes = await Recipe.all(req.user.user_id)
        if(recipes.length === 0) {
            return res.json("No recipes found for user")
        } else {
            return res.json({ recipes });
        }
    } catch(e) {
        console.log(`Retrieving recipes failed for user`);
        return next(e);
    }
});

/** GET /search/:recipe_id - request a previously created recipe from database.
 * 
 *  => { recipe }
 * 
 *  Authorization required: login
 */

router.get("/search/:recipe_id", ensureLoggedIn, async(req, res, next) => {
    try {
        let recipe = await Recipe.get(req.params.recipe_id);
        return res.json({ recipe })
    } catch(e) {
        console.log("Get recipe route request has failed")
        return next(e);
    }
});

module.exports = router;