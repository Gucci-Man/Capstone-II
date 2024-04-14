/**
 * Configurations 
 */

require('dotenv').config();

const DB = (process.env.NODE_ENV === "test")
    ? "foodie_fit_test"
    : "foodie_fit";

const SECRET_KEY = process.env.SECRET_KEY || "fHt$TRcC%25HmE8gC'vD$!Ka%8sOt;~V,XItr+8t+)8;x}O/rSQgGyG7}o^c1')"

const BCRYPT_WORK_FACTOR = 12;

const CHATGPT_KEY = process.env.OPENAI_API_KEY

module.exports = {
    DB,
    SECRET_KEY,
    BCRYPT_WORK_FACTOR,
    CHATGPT_KEY,
};