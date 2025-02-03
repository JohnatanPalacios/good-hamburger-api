const { response } = require('express');
const { validationResult } = require('express-validator');


const orderValidator = (req, res = response, next) => {
    const { extras } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.mapped() });
    }

    if (extras && new Set(extras).size !== extras.length) {
        return res.status(400).json({ error: 'Duplicate extras are not allowed' });
      }

    next();
}

module.exports = { orderValidator }