const express = require('express');
const db = require('../../db');

const router = express.Router();


router.get('/', function(req, res, next) {
  res.render('register', { title: 'Super Secure Registration' });
});

router.post('/', async (req, res, next) => {

  const username = req.body['username'];
  const password = req.body['password'];
  const firstName = req.body['firstName'];
  const lastName = req.body['lastName'];

  const query = "INSERT INTO accounts (username, password, first_name, last_name) VALUES (\"" + username + "\",\"" + password + "\",\"" + firstName + "\",\"" + lastName + "\");";

  db.query(query, (err, response) => {
    if (err) {
      res.render('error', {
        message: 'Error loading account',
        error: err
      });
      return;
    }

    res.redirect('/login');
  });
});

module.exports = router;
