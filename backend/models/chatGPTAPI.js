/**
 * Model for ChatGPT API
 */
const { CHATGPT_KEY } = require("../config");
const { OpenAI } = require('openai');
const axios = require('axios');

const { ExpressError, NotFoundError, BadRequestError, UnauthorizedError }= require("../expressError");

const openai = new OpenAI({ apiKey: CHATGPT_KEY });

async function callChatGPT(prompt) {
    try {
        const response = await openai.chat.completions.create({
            messages: [
                {
                    role:"system",
                    content: " You are a helpful assistant designed to output JSON",
                },
                {
                    role: "user",
                    content: prompt,
                }
            ],
            model: "gpt-3.5-turbo",
            response_format: { type: "json_object"},
        });
        console.log(response.choices[0].message.content);
        return response.choices[0].message.content;
    } catch (err) {
        console.log("Error calling ChatGPT API")
        throw new BadRequestError("ChatGPT API request failed");
    }
}

module.exports = { callChatGPT }