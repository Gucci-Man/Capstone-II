-- Drop existing tables to avoid conflicts (adjust if needed)
DROP TABLE IF EXISTS favorite_recipes; 
DROP TABLE IF EXISTS blog_posts;
DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS users;

-- Table creation
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    password VARCHAR(255) NOT NULL -- Store as a secure hash
    -- Add other profile fields as needed
);

CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    total_time TEXT NOT NULL,
    instructions TEXT NOT NULL,
    creator_id INTEGER NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE blog_posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    recipe_id INTEGER NOT NULL,
    date DATE NOT NULL, --YYYY-MM-DD
    contents TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
);

CREATE TABLE favorite_recipes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    recipe_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
    UNIQUE (user_id, recipe_id) -- Prevent duplicate favorites 
);
