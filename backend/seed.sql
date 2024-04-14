INSERT INTO users (username, first_name, last_name, email, password)
VALUES ('testuser',
        'Bruce',
        'Wayne',
        'bruce@batman.com',
        'test password'),
       ('second_user',
        'Tony',
        'Stark',
        'stark@ironman.com',
        'iron man rules');

INSERT INTO recipes (title, total_time, instructions, creator_id)
VALUES ('test recipe',
        '30 minutes',
        'test instructions',
        1),
       ('Iron Cake',
        '1 hour',
        'Bake at 1000 degrees',
        2);

INSERT INTO blog_posts (user_id, recipe_id, date, contents)
VALUES (1, 1, '2023-04-03', 'This is the blog content'),
       (1, 2, '2023-10-03', 'Iron cake taste amazing');

INSERT INTO favorite_recipes (user_id, recipe_id)
VALUES (1,1),
       (2,1);