DROP TABLE IF EXISTS users;

--create the table for users--
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR NOT NULL,
  email VARCHAR unique NOT NULL,
  password_digest TEXT
);

