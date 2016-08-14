DROP TABLE IF EXISTS users;
DROP Table IF EXISTS locations;
--create the table for users--
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR NOT NULL,
  email VARCHAR unique NOT NULL,
  password_digest TEXT
);
CREATE TABLE locations (
  location_id SERIAL PRIMARY KEY NOT NULL,
  address VARCHAR NOT NULL,
  user_id INT NOT NULL
);
