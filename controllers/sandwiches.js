const path = require('path');
const { response } = require('express');
const Sandwich = require(path.resolve('./models/Sandwich'));

const listSandwiches = async (req, res = response) => {
    const sandwiches = await Sandwich.find().sort("-name");
    res.json(sandwiches);
  };

module.exports = { listSandwiches };
