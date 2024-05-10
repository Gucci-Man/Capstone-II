/**
 * config.js
 * ---------
 * Stores central configuration settings for the application, handling both 
 * sensitive data (API keys) and environment-specific options.
 * 
 * Key Features:
 * *  Loads environment variables from a `.env` file (using dotenv).
 * *  Provides a dynamic database URI based on environment (development, testing, etc.).
 * *  Customizes bcrypt work factor for faster testing.
 *
 */

require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY || "super-secret"

const CHATGPT_KEY = process.env.OPENAI_API_KEY;

const PORT = +process.env.PORT || 3000;

/* function getDatabaseUri() {
    return (process.env.NODE_ENV === "test")
        ? "foodie_fit_test"
        : "foodie_fit";
  } */

const DB = (process.env.NODE_ENV === "test")
    ? "foodie_fit_test"
    : "foodie_fit";

// Speed up bcrypt during tests, since algorithm safety isn't being tested
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

module.exports = {
    DB,
    SECRET_KEY,
    BCRYPT_WORK_FACTOR,
    CHATGPT_KEY,
    PORT,
    /* getDatabaseUri, */
};