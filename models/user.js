'use strict'

//here we are calling pg promise to access the database
//make sure the database is correct in psql
const db = require('./connections.js')
const bcrypt  = require('bcrypt');
const salt    = bcrypt.genSaltSync(10);


const createSecure = (password)=>
  new Promise( (resolve,reject)=>
    bcrypt.genSalt( (err, salt)=>
      bcrypt.hash(password, salt, (err, hash)=>
        err ? reject(err) : resolve(hash)
      )
    )
  )

//get all users
function getAllUsers(req,res,next) {
  db.any(`SELECT * FROM users`)
    .then(data => {
      res.rows = data;
      next();
    })
    .catch( error=> {
      console.log('Error ', error)
    })
}

//get a specific users
function getUser(req,res,next) {
  db.one(`
      SELECT *
      FROM users
      WHERE email = $1;
      `, [req.body.email])
      .then( user=>{

        if(bcrypt.compareSync(req.body.password, user.password_digest)){
          res.user = user;
        }else{
          res.error = true
        }
        console.log(res.user)
        next()

      })
      /* NOTE: NO USERS or all ERRORS*/
      .catch( error=>{
        console.error('Error ', error);
        res.error = error
        next()
      })
  }

//add a new user
function addUser(req,res,next) {
  createSecure(req.body.password).then( hash=>{
        console.log('going into db')
        db.any(`INSERT INTO users (name, email, password_digest) VALUES($1, $2, $3) returning *;`,
      [req.body.name, req.body.email, hash])
    .then(data => {
      console.log('coming out of db')
      console.log(data)
      res.rows = data;
      next();
    })
    .catch( error=> {
      console.log('Error ', error)
    })
  })
}
//delete a user
function deleteUser(req,res,next) {
  db.any(`delete FROM users WHERE user_id=$1;`, [req.params.id])
  .then(data => {
      res.rows = data;
      next();
    })
    .catch( error=> {
      console.log('Error ', error)
    })
}
function updateUser(req,res,next) {
  db.any(`UPDATE users (user_name, email) VALUES($1, $2);`, [req.body.user_name, req.body.email])
    .then(data => {
      res.rows = data;
      next();
    })
    .catch( error=> {
      console.log('Error ', error)
    })
}


//export it to the controller
module.exports = { getAllUsers, getUser, addUser, deleteUser, updateUser};

