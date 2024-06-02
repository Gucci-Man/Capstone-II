/**
 * config.test.js
 * ---------------
 * Unit tests for the configuration module (config.js).
 * 
 * This module tests:
 * * Ability to load configuration settings from environment variables.
 * * Dynamically obtaining the correct database URI based on environment.
 * * Behavior of BCRYPT_WORK_FACTOR in test environment.
 */

describe("config can come from env", function () {
    test("works", function () {
        
        process.env.SECRET_KEY = "abc";       
        process.env.PORT = "5000";             
        process.env.NODE_ENV = "test";        

        const config = require("./config"); 

        // Test that configuration values match the environment variables
        expect(config.SECRET_KEY).toEqual("abc");
        expect(config.PORT).toEqual(5000);    
        expect(config.getDatabaseUri()).toEqual("foodie_fit_test");
        expect(config.BCRYPT_WORK_FACTOR).toEqual(1); 

        delete process.env.SECRET_KEY;
        delete process.env.PORT;
        delete process.env.BCRYPT_WORK_FACTOR;
        delete process.env.NODE_ENV;

        // Test database URI when no NODE_ENV is set (default to production)
        expect(config.getDatabaseUri()).toEqual("foodie_fit");

    
        process.env.NODE_ENV = "test"; 

        // Test database URI again to confirm it switches back to test database
        expect(config.getDatabaseUri()).toEqual("foodie_fit_test");
    });
});
