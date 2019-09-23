INSERT INTO cart_items(book_id, quantity, user_id, price, image, title)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *; 

