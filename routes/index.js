var express = require('express');
var router = express.Router();
var db = require("../models");

/* GET home page. */
router.get('/', (req, res, next) => {
  db.Article.find({}).then((dbArticle) => {
    res.render('index', { title: 'Express', article: dbArticle })
  }).catch( err => {
    res.render('error', {error: err})
  })
});

module.exports = router;
