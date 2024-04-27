# Capstone II

## Created by Adel Ngo

**API**: https://platform.openai.com/docs/overview

**To seed database:**
psql < foodie_fit_db_setup.sql

### Running the backend
`npm run start` - Starts the backend in production mode

`npm run dev` - Starts the backend in development mode

`npm run test` - Runs tests

### Running the frontend
`npm run dev` - Starts the frontend in dev mode

## Project Layout

1. **Backend API**: you'll need a backend server and API to act as an intermediary between your React app and the PostgreSQL database. Popular technologies for building this include:

* Node.js with Express.js: JavaScript-based framework for creating web servers and APIs.

2. **API Endpoints**: Your backend API will define endpoints that your React app can interact with. Examples:

* GET /recipes: Fetches a list of recipes.
* POST /recipes: Creates and adds a new recipe.
* GET /users/:id/favorites: Retrieves a user's favorite recipes.

3. **Data Fetching in React**:  You'll use techniques within React to make requests to these API endpoints and handle the data:

* Libraries like Axios: Provide more features and a cleaner interface for API interactions.

### Simplified Flow

1. User interacts with your React app (e.g., searches for a recipe).
2. React makes a request to your backend API (e.g., GET /recipes?search=chicken).
3. Your backend queries the PostgreSQL database.
4. The backend sends the relevant recipe data back to your React app in a format React can understand (usually JSON).
5. React updates the UI to display the search results.

## Core Components

1. **PostgreSQL Setup**:

    - Ensure you have a PostgreSQL database set up with your schema (tables for Users, Recipes, etc.) created.

2. **Node.js Backend**:

    - Install necessary dependencies:
    - npm install express pg ('pg' is the PostgreSQL client for Node.js)
    - Create API endpoints for data interactions.
ChatGPT API:

3. **Obtain your ChatGPT API key.**
    - Set up a way to make requests to the ChatGPT API from your backend.