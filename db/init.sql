CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title TEXT,
    author TEXT,
    subject TEXT[],
    pages INTEGER,
    image TEXT,
    description TEXT,
    price INTEGER
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    auth0_id INTEGER,
    profile_name TEXT,
    email TEXT, 
    picture TEXT
);

CREATE TABLE categories(
    category_id SERIAL PRIMARY KEY,
    category VARCHAR, 
    book_id INT REFERENCES books(id)
);

CREATE TABLE cart_items (
    cart_item_id SERIAL PRIMARY KEY,
    book_id INT REFERENCES books(id),
    title TEXT, 
    quantity INT,
    user_id INT REFERENCES users(user_id), 
    price INT,
    image TEXT
);

CREATE TABLE book_categories(
    id SERIAL PRIMARY KEY,
    book_id INT,
    category_id INT 
); 

INSERT INTO books (title, author, subject, pages, image, description, price)
    VALUES ();