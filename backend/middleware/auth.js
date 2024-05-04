/**
 * auth.js
 * -------
 * Provides authentication and authorization middleware for securing API routes.
 *
 * Functions:
 *   * authenticateJWT: Verifies a JSON Web Token (JWT) in the request header, 
 *                     attaching the decoded user payload to the request object if valid.
 *   * ensureLoggedIn:  Ensures a user is logged in by checking for a valid payload 
 *                      on the request object. Throws an UnauthorizedError if not found.
 *   * ensureCorrectUser: Verifies that the authenticated user's username matches 
 *                        the username provided in the request parameters. 
 *                        Throws an UnauthorizedError if there's a mismatch. 
 */ 

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError }= require("../expressError");

/** Middleware: Auth JWT token, add auth'd user (if any) to req. */
function authenticateJWT(req, res , next) {
    try {  
        // Look for token in header
        const authHeader = req.headers.authorization;
        if(!authHeader) {
            return next(); // Token not found, but don't throw an error
        }
        const token = authHeader.split(' ')[1]; // Extract token after "Bearer "
       

        // payload should have included username property
        const payload = jwt.verify(token, SECRET_KEY);
        // add payload on to req.user. If req..user exist, then token is verified.
        req.user = payload;
        return next();
    } catch (e) {
        // Error in this middleware isn't error -- continue on
        return next();
    }
};

/** Middleware: Require user is authenticated */
function ensureLoggedIn(req, res, next) {
    if (!req.user) {
        const e = new UnauthorizedError("Unauthorized");
        return next(e)
    } else {
        return next();
    }
}

/** Middleware: Requires correct username. */
function ensureCorrectUser(req, res, next) {
    try {
        // username from req.user should match with req.params
        /* console.log(`req.user is ${JSON.stringify(req.user, null, 2)}`); */
        if (req.user.username === req.params.username) {
            return next();
        } else {
            const e = new UnauthorizedError("Unauthorized");
            return next(e);
        }
    } catch (err) {
        // Errors would happen here if we made a request and req.user is undefined
        const e = new UnauthorizedError("Unauthorized");
        return next(e);
    }
}
// end

module.exports = { 
    authenticateJWT, 
    ensureLoggedIn, 
    ensureCorrectUser 
};