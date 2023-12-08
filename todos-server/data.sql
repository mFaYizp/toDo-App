CREATE TABLE todos (
    id VARCHAR(255) PRIMARY KEY,
    user_email VARCHAR (255),
    title VARCHAR(30),
    progress INT,
    date VARCHAR (300)
);

CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    hashed_password VARCHAR(255)
);


INSERT INTO todos (id, user_email, title, progress, date) VALUES
    ('1', 'user1@example.com', 'Complete Task A', 50, '2023-01-15'),
    ('2', 'user2@example.com', 'Review Task B', 30, '2023-01-18'),
    ('3', 'user3@example.com', 'Start Task C', 10, '2023-01-20'),
    ('4', 'user4@example.com', 'Finish Task D', 80, '2023-01-22'),
    ('5', 'user5@example.com', 'Submit Task E', 100, '2023-01-25');