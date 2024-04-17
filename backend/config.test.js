
describe("config can come from env", function() {
    test("works", function(){
        process.env.SECRET_KEY = "abc";
        process.env.PORT = "5000";
        process.env.NODE_ENV = "test";

        const config = require("./config");
        expect(config.SECRET_KEY).toEqual("abc");
        expect(config.PORT).toEqual(5000);
        expect(config.getDatabaseUri()).toEqual("foodie_fit_test");
        expect(config.BCRYPT_WORK_FACTOR).toEqual(1);

        delete process.env.SECRET_KEY;
        delete process.env.PORT;
        delete process.env.BCRYPT_WORK_FACTOR;
        delete process.env.NODE_ENV;
        
        expect(config.getDatabaseUri()).toEqual("foodie_fit");
        process.env.NODE_ENV = "test";

        expect(config.getDatabaseUri()).toEqual("foodie_fit_test");
    });
});