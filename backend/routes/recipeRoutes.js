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

router.post('/', ensureLoggedIn, async(req, res, next) => {
    try {        
        const validator = jsonschema.validate(req.body, recipeSchema);
        /* console.log(`user_id is ${JSON.stringify(req.user)}`); */
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        
        let recipe = await Recipe.add(req.body,req.user.id)
        return res.status(201).json({ recipe })
    } catch (e) {
        console.log("Add recipe route request has failed")
        return next(e);
    }
});

/** GET /[username] - request all recipes associated with user only
 *  
 *  => { recipes: [recipe,...] }
 * 
 *  Authorization required: login
 */

router.get("/:username", ensureCorrectUser, async(req, res, next) => {
    try {
        let recipes = await Recipe.user_all(req.user.id)
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

/** GET / - get a list of all recipes
 * 
 *  => { recipes: [{ recipe_id, title, total_time, instructions },...] }
 */

router.get(`/`, ensureLoggedIn, async(req, res, next) => {
    try {
        let recipes = await Recipe.all();
        return res.json({ recipes })
    } catch (e) {
        return next(e);
    }
});

/** GET /[id] - request a previously created recipe from database.
 * 
 *  => { recipe }
 * 
 *  Authorization required: login
 */

router.get("/:id", ensureLoggedIn, async(req, res, next) => {
    try {
        let recipe = await Recipe.get(req.params.id);
        return res.json({ recipe })
    } catch(e) {
        console.log("Get recipe route request has failed")
        return next(e);
    }
});

/** DELETE /[id] => { deleted: recipe_id }
 *  
 *  Only the user can delete their own recipe
 * 
 *  Authorization required: login
 */

router.delete("/:id", async(req, res, next) => {
    try {
        await Recipe.remove(req.params.id, req.user.id);
        return res.json({deleted: req.params.id});
    } catch (err) {
        return next(err);
    }
});

// --------- TODO EXTRA --------------
/** PUT /recipe_id
 *  
 *  Only the user can update recipe
 * 
 *  Authorization required: login
 */

module.exports = router;