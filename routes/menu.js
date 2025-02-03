/*
    Routs for sandwiches
    host + /api/menu
*/

const { Router } = require("express");

const router = Router();

const { listMenu } = require("../controllers/menu");

// List sandwiches and extras
router.get("/", listMenu);

module.exports = router;
