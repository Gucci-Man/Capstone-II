# FoodieFit: A Delicious Journey to Fitness  

FoodieFit is a web application designed to help users manage their health and well-being through a fun and personalized approach to food and fitness. 

## Created by Adel Ngo

**API**: https://platform.openai.com/docs/overview

## Features

* **Recipe Creation & Management:** Users can create and store personalized recipes, allowing them to control ingredients and adapt dishes to their dietary needs or preferences. 

* **User Authentication:** Secure login and registration functionalities enable personalized recipe storage and management.
* **User Profile Management:** Users can view and delete their profile information.
* **Recipe Display:** Users can view and access their created recipes, making it easy to find and cook their favorite dishes.
* **Responsive Design:** The application adapts to various screen sizes, ensuring a seamless user experience across different devices.

These features were chosen to create a user-friendly platform that empowers individuals to take charge of their health through mindful recipe creation and meal planning. By allowing users to personalize their recipes, FoodieFit caters to a wide range of dietary needs and preferences, making healthy eating more accessible and enjoyable.

## Setup

To get FoodieFit up and running, follow these steps:

### Prerequisites

* Node.js and npm (or yarn) installed on your system.
* PostgreSQL database set up.
* An API key from OpenAI 
* A `.env` file to store sensitive information like the _OpenAI API Key_ and _Bcrypt Encryption Key_.

**To seed database:**
$ psql < db_setup.sql

### Backend Setup

1. Clone the project repository.
2. Navigate to the backend directory in your terminal.
3. Install dependencies: `npm install` 
4. Set up your environment variables (API keys, database credentials, etc.)
5. Start the development server: `npm run dev` 
   OR start the production server: `npm run start`

**To run tests**: `npm run test` 

### Frontend Setup

1. Navigate to the frontend directory in your terminal.
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

The frontend should typically connect to your running backend server.

## Standard User Flow

1. **Welcome & Login:** Users arrive at the Welcome Page where they can either log in using an existing account or navigate to the registration page to create a new account.
2. **Authentication:** Upon successful login, users are redirected to their personalized homepage.
3. **Recipe Creation & Management:** Users can access a recipe creation form to add new recipes with ingredients and instructions. They can also view and manage their existing recipes on their homepage.
4. **User Profile Management:** Users can access and edit their profile information from their homepage.

5. **Logout:** When finished, users can log out to exit the application.

## Technology Stack

![JavaScript](Logos/icons8-javascript-48.png)

![HTML5](Logos/icons8-html-48.png)

![CSS](Logos/icons8-css-48.png)

![Bootstrap](Logos/icons8-bootstrap-48.png)

![Node.js](Logos/icons8-nodejs-48.png)

![Express](Logos/icons8-express-js-64.png)

![React](Logos/icons8-react-40.png)

![SQL](Logos/icons8-sql-64.png)

![PostgreSQL](Logos/icons8-postgresql-48.png)

* **JavaScript**
* **HTML**
* **CSS** 
* **Bootstrap**
* **Node.js**
* **Express**
* **React**
* **SQL**
* **PostgreSQL**
* **Axios**
* **Bcrypt**
* **JSON Web Token**
* **JSON Schema**
* **Jest**
