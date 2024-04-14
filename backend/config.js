/**
 * Configurations 
 */

require('dotenv').config();

const DB = (process.env.NODE_ENV === "test")
    ? "foodie_fit_test"
    : "foodie_fit";

const SECRET_KEY = process.env.SECRET_KEY 

const BCRYPT_WORK_FACTOR = 12;

const CHATGPT_KEY = process.env.OPENAI_API_KEY

module.exports = {
    DB,
    SECRET_KEY,
    BCRYPT_WORK_FACTOR,
    CHATGPT_KEY,
};