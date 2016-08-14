'use strict'

//here we are calling pg promise to access the database
//make sure the database is correct in psql
const db = require('./connections.js')

//get all items that are using share bear
function getAllLocations(req,res,next) {
  let user= req.query.user
  db.any(`SELECT address FROM locations join users on locations.user_id=users.user_id where locations.user_id=${user}`)
    .then(data => {
      res.rows = data;
      next();
    })
    .catch( error=> {
      console.log('Error ', error)
    })
}

//get a specific items
function getLocation(req,res,next) {
  db.one(`SELECT * FROM items WHERE location_id=$1`, [req.params.id])
    .then(data => {
      res.rows = data;
      next();
    })
    .catch( error=> {
      console.log('Error ', error)
    })
}

function addLocation(req,res,next) {
  db.any(
      `INSERT INTO locations(address, user_id)
      VALUES($1, $2)
      returning *;`,
      [req.body.address, req.body.user_id])
    .then(data => {
      res.rows = data;
      next();
    })
    .catch( error=> {
      console.log('Error ', error)
    })
}


function deleteLocation(req,res,next) {
  db.any(`delete FROM items WHERE location_id=$1;`, [req.params.id])
  .then(data => {
      res.rows = data;
      next();
    })
    .catch( error=> {
      console.log('Error ', error)
    })
}

//export it to the controller
module.exports = { getAllLocations, getLocation, addLocation, deleteLocation};

