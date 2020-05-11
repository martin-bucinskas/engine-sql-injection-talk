const express = require('express');
const url = require('url');

const router = express.Router();


router.get('/', function(req, res, next) {
  const error = req.query['error'];
  const message = req.query['message'];

  res.render('login', {
    title: 'Bank of Engine',
    message: message,
    error: error
  });
});

module.exports = router;
