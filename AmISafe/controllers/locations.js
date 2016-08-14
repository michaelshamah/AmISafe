const router = require('express').Router();
const { getAllLocations, getLocation, addLocation, deleteLocation} = require('../models/locations.js');

// show all items
router.get('/', getAllLocations, (req,res) => {
  res.send(res.rows)
});

// Show a single item
router.get('/:id', getLocation, (req,res) => {
  res.send(res.rows)
});

//add a new item
router.post('/new', addLocation, (req,res) => {
    res.send(res.rows)
});

//Delete an item
router.delete('/:id', deleteLocation, (req,res) => {
  res.send(req.params.id)
});



//export it to a the server.js
module.exports = router;

