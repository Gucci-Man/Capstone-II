/**
 *  Routes for calling ChatGPT API
 * 
 */

const jsonschema = require("jsonschema");

const express = require('express');
const router = new express.Router();
const db = require("../db");
const ChatGPT = require("../models/chatGPTAPI");
const { ensureLoggedIn } = require("../middleware/auth");
// create a schema for ChatGPT API
const { ExpressError } = require("../expressError");

/** GET /request - send a recipe request. Logged in required
 * 
 *  => {response: { API response }}
 * 
 *  Authorization required: login
 */

router.get('/request', ensureLoggedIn, async(req, res, next) => {
    try {
        let prompt = "Hello, how are you?"
        let response = await ChatGPT.callChatGPT(prompt);
        return res.json({ response })
    } catch (e) {
        console.log("ChatGPT route request has failed")
        return next(e);
    }
});

module.exports = router;