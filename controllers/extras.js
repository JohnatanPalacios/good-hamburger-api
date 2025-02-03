const path = require('path');
const { response } = require('express');
const Extra = require(path.resolve('./models/Extra'));

const listExtras = async (req, res = response) => {
    const extras = await Extra.find().sort('-createdAt');
    res.json(extras);
  };

module.exports = { listExtras };
