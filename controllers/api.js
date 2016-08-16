const router = require('express').Router();
const tokenService = require('../models/tokens.js')
const { getAllUsers, getUser} = require('../models/user.js');

router.post('/authenticate/:id', getUser, tokenService.createToken)

router.get('/', getAllUsers, (req,res) => {
  res.json( res.rows.map( user=>{
      /*only pull out the username and the id*/
      const {user_id, name} = user;
      return {user_id, name}
    })
  )
});

module.exports = router;
