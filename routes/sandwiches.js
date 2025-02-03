/*
    Routs for sandwiches
    host + /api/menu
*/

const { Router } = require('express');

const router = Router();

const { listSandwiches } = require('../controllers/sandwiches');


  // List only sandwiches
  router.get( '/sandwiches', listSandwiches );

  module.exports = router;
