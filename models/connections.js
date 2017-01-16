const pg = require('pg-promise')({});

const config = {
  host:       process.env.PG_HOST,
  port:       process.env.PG_PORT,
  database:   process.env.PG_NAME,
  user:       process.env.PG_USER,
  password:   process.env.PG_PASS,
};
const db = pg(config);

module.exports= db
