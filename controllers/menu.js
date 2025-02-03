const path = require('path');
const { response } = require('express');
const Extra = require(path.resolve('./models/Extra'));
const Sandwich = require(path.resolve('./models/Sandwich'));

const listMenu = async (req, res = response) => {
    try {
        const extras = await Extra.find().sort('-createdAt');
        const sandwiches = await Sandwich.find().sort("-name");

        res.json({
            extras,
            sandwiches
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  };

module.exports = { listMenu };
