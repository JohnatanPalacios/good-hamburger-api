/*
    Routs for sandwiches
    host + /api/menu
*/

const { Router } = require('express');

const router = Router();

const { listExtras } = require('../controllers/extras');


  // Listar solo extras
  router.get('/extras', listExtras);
  
  module.exports = router;
