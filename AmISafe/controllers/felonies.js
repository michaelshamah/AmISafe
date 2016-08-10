const router = require('express').Router();
const felonies = require('../models/felonies.js')

router.get('/', felonies.felonies, (req, res)=>{
  res.json(res.data)
})

module.exports = router
