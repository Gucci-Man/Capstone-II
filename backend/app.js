/**
 * app.js
 * ------
 * Main entry point for FoodieFit backend server. This file sets up:
 *
 * *  Express server configuration.
 * *  CORS middleware (for cross-origin requests).
 * *  Body parsing middleware.
 * *  Authentication middleware.
 * *  API route definitions.
 * *  Error handling middleware. 
 *
 * To start backend: nodemon app.js OR npm run dev
 */

const express = require("express");
const cors = require("cors"); // Middleware for handling cross-origin requests
const { authenticateJWT } = require("./middleware/auth")
const { NotFoundError }= require("./expressError")

// Creates an Express application instance
const app = express();

// allow connections to all routes from any browser
app.use(cors());

// allow both form-encoded and json body parsing
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// get auth token for all routes
app.use(authenticateJWT);

/** routes */

const userRoutes = require('./routes/userRoutes');
const authRoutes = require(`./routes/authRoutes`);
const recipeRoutes = require(`./routes/recipeRoutes`);

// route prefixing
app.use('/users', userRoutes);
app.use(`/auth`, authRoutes);
app.use(`/recipes`, recipeRoutes);

/** 404 handler */

app.use(function(req, res, next) {
    return next(new NotFoundError());
  });

/** general error handler */

app.use((err, req, res, next) => {
    // the default status is 500 Internal Server Error
    let status = err.status || 500;

    return res.status(status).json({
        error: {
            message: err.message,
            status: status
        }
    });
  });

module.exports = app;