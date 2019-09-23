INSERT INTO users(auth0_id, profile_name, email, picture)
VALUES($1, $3, $2, $4) returning *;