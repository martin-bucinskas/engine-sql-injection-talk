const express = require('express');
const db = require('../db');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  const username = req.query['user'];

  const query = `SELECT * FROM accounts WHERE username = "${username}" LIMIT 1`;

  db.query(query, (err, response) => {
    if (err || response.length === 0) {
      res.render('error', {
        message: 'Error loading account',
        error: err
      });
      return;
    }

    const data = JSON.parse(JSON.stringify(response))[0];

    res.render('account', {
      title: 'Bank of Engine',
      username: data['username'],
      firstName: data['first_name'],
      lastName: data['last_name']
    });
  });
});

module.exports = router;
