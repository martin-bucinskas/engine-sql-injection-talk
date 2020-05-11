const express = require('express');
const url = require('url');
const db = require('../../db');

const router = express.Router();


router.get('/', function(req, res, next) {
  const error = req.query['error'];

  res.render('login', { title: 'Super Secure Login', error: error});
});

router.post('/', async (req, res, next) => {

  const username = req.body['username'];
  const password = req.body['password'];

  let redirectUrl = url.format({
    pathname: '/login',
    query: {
      error: 'Failed to login'
    }
  });

  const query = `SELECT * FROM accounts WHERE username = "${username}" AND password = "${password}"`;

  db.query(query, (err, response) => {
    if (err) {
      res.render('error', {
        message: 'Error logging in',
        error: err
      });
      return;
    }

    if (response.length > 0) {
      redirectUrl = url.format({
        pathname: '/account',
        query: {
          user: username
        }
      });
    }

    res.redirect(redirectUrl);
  });
});

module.exports = router;
