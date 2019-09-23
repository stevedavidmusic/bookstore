SELECT * FROM 
books b INNER JOIN book_categories bc 
ON b.id = bc.book_id  
INNER JOIN categories c ON bc.category_id=c.category_id 
WHERE c.category  = $1
AND b.id != $2
ORDER BY RANDOM()
LIMIT 6; 
