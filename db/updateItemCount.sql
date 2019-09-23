UPDATE cart_items
SET quantity = $1
WHERE cart_item_id = $2;
SELECT * FROM cart_items WHERE user_id = $3
ORDER BY book_id DESC; 