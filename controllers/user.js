const router = require('express').Router();
const { getAllUsers, getUser, addUser, updateUser, deleteUser  } = require('../models/user.js');

const tokenService = require('../models/tokens.js')


//add a new user
router.post('/new', addUser, (req,res) => {
    res.send(res.rows)
});

// router.use( tokenService.validateToken )

// Show a single user
router.get('/:id', getUser, (req,res) => {
  res.send(res.rows)
});


// Edit user
router.put('/:id', updateUser, (req,res) => {
  res.send(req.params.id)
});

//delete a user
router.delete('/:id', deleteUser, (req,res) => {
  res.send(req.params.id)
})
//export it to a the server.js
module.exports = router;
