/**
 * Model for ChatGPT API
 */
const { CHATGPT_KEY } = require("../config");
const { OpenAI } = require('openai');
const axios = require('axios');
const db = require("../db");

const { ExpressError, NotFoundError, BadRequestError, UnauthorizedError }= require("../expressError");

const openai = new OpenAI({ apiKey: CHATGPT_KEY });

class ChatGPT {
    static async callChatGPT(ingredients, user_id) {
        try {
            const recipeArr = Object.keys(ingredients);
            const prompt = recipeArr.join(", ");
            const response = await openai.chat.completions.create({
                messages: [
                    {
                        role:"system",
                        content: "Act as a chef, create a recipe with the given ingredients and return in JSON having properties title, ingredients, total_time and instructions",
                    },
                    {
                        role: "user",
                        content: prompt,
                    }
                ],
                model: "gpt-3.5-turbo",
                response_format: { type: "json_object"},
            });
            // convert response to JSON and check if valid
            const recipeObject = JSON.parse(response.choices[0].message.content);
            if (!recipeObject) throw new BadRequestError("ChatGPT response did not contain valid JSON");
            console.log(recipeObject);

            // Save recipe to database
            const results = await db.query(
                `INSERT INTO recipes (title, total_time, instructions, creator_id)
                VALUES ($1, $2, $3, $4)
                RETURNING recipe_id, title, total_time, instructions, creator_id`,
                [recipeObject.title, recipeObject.total_time, recipeObject.instructions, user_id]
            )
            console.log(`recipe results is ${JSON.stringify(results.rows[0])}`);

            return response.choices[0].message.content;
        } catch (err) {
            console.log("Error calling ChatGPT API")
            throw new BadRequestError("ChatGPT API request failed");
        }
    };
};


module.exports = ChatGPT;