/**
 *  Model for recipes
 */

const ChatGPT = require("../models/chatGPTAPI");
const db = require("../db");
const { ExpressError, NotFoundError, BadRequestError, UnauthorizedError }= require("../expressError");

class Recipe{

    /** Add: Retrieve recipe from ChatGPT and add to recipe database */

    static async add(ingredients, user_id) {

        // retrieve recipe from ChatGPT API
        let recipeObj = await ChatGPT.callChatGPT(ingredients);
        if(!recipeObj) throw new BadRequestError("Request to ChatGPT API failed");

        // save recipe to database
        const results = await db.query(
            `INSERT INTO recipes (title, total_time, instructions, creator_id)
            VALUES ($1, $2, $3, $4)
            RETURNING recipe_id, title, total_time, instructions, creator_id`,
            [recipeObj.title, recipeObj.total_time, recipeObj.instructions, user_id]);

        const recipe = results.rows[0];
        if(!recipe) throw new ExpressError(`Recipe database error`, 404);

        return recipe
    }

    /** Get: Retrieve a saved recipe by recipe_id
     * 
     *  returns { recipe_id, title, total_time, instructions }
     */

    static async get(recipe_id) {
        const results = await db.query(
            `SELECT recipe_id, title, total_time, instructions, creator_id
            FROM recipes
            WHERE recipe_id = $1`, [recipe_id]);

        if (!results.rows[0]) {
            throw new NotFoundError(`recipe was not found with recipe_id: ${recipe_id}`);
        } 
        return results.rows[0];
    }
}

module.exports = Recipe;