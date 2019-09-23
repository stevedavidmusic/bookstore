SELECT c.cart_item_id, c.user_id, c.quantity, c.book_id, c.image, c.price, c.title
FROM cart_items c
JOIN users u 
ON u.user_id = c.user_id
WHERE c.user_id = $1
ORDER BY book_id DESC; 